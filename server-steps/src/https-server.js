const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

/**
 * Create an HTTPS server for production or HTTP server for development
 * @param {Express.Application} app - The Express application
 * @param {Object} options - Server options
 * @returns {Object} - Object with server and io instances
 */
const createServer = (app, options = {}) => {
  const {
    useHttps = process.env.NODE_ENV === 'production',
    keyPath = process.env.SSL_KEY_PATH,
    certPath = process.env.SSL_CERT_PATH,
    httpPort = process.env.HTTP_PORT || 3001,
    httpsPort = process.env.HTTPS_PORT || 3443,
    redirectHttp = true,
    corsOrigins = ['http://localhost:3000', 'http://localhost:5173', 'https://localhost:3000', 'https://localhost:5173']
  } = options;

  let server;
  
  // Create HTTPS server for production
  if (useHttps && keyPath && certPath) {
    try {
      // Read SSL certificates
      const key = fs.readFileSync(path.resolve(keyPath));
      const cert = fs.readFileSync(path.resolve(certPath));
      
      // Create HTTPS server
      server = https.createServer({ key, cert }, app);
      console.log(`HTTPS server created on port ${httpsPort}`);
      
      // Also create HTTP server that redirects all traffic to HTTPS
      if (redirectHttp) {
        const redirectApp = express();
        redirectApp.use((req, res) => {
          const hostPort = req.headers.host.split(':');
          const host = hostPort[0];
          res.redirect(301, `https://${host}:${httpsPort}${req.url}`);
        });
        
        http.createServer(redirectApp).listen(httpPort, () => {
          console.log(`HTTP -> HTTPS redirect server started on port ${httpPort}`);
        });
      }
    } catch (error) {
      console.error('Error creating HTTPS server:', error.message);
      console.warn('Falling back to HTTP server');
      server = http.createServer(app);
    }
  } else {
    // Create HTTP server for development
    server = http.createServer(app);
    console.log(`HTTP server created on port ${httpPort}`);
  }
  
  // Create Socket.IO server with CORS settings
  const io = new Server(server, {
    cors: {
      origin: corsOrigins,
      methods: ['GET', 'POST'],
      credentials: true
    }
  });
  
  return { server, io };
};

/**
 * Generate self-signed certificates for development
 * Note: These should NEVER be used in production
 * @param {string} outDir - Directory to save certificates
 * @returns {Object} - Paths to generated certificates
 */
const generateDevCertificates = async (outDir = './ssl') => {
  try {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    
    // Define certificate paths
    const keyPath = path.join(outDir, 'dev-key.pem');
    const certPath = path.join(outDir, 'dev-cert.pem');
    
    // Only generate if they don't exist
    if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
      console.log('Generating self-signed certificates for development...');
      
      // This would normally use Node.js's crypto module or a package like selfsigned
      // For simplicity, we're just showing a warning here
      console.warn('WARNING: Auto-generation of certificates not implemented.');
      console.warn('For development purposes, you can generate self-signed certificates using:');
      console.warn('openssl req -x509 -newkey rsa:4096 -keyout dev-key.pem -out dev-cert.pem -days 365 -nodes');
      
      return { success: false };
    }
    
    return {
      success: true,
      keyPath,
      certPath
    };
  } catch (error) {
    console.error('Error generating development certificates:', error.message);
    return { success: false, error };
  }
};

module.exports = {
  createServer,
  generateDevCertificates
}; 