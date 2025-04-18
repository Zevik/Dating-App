import React, { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  interests: string[];
  bio: string;
  notifications: boolean;
  ageConfirmation: boolean;
  terms: boolean;
}

const FormExample: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    interests: [],
    bio: '',
    notifications: true,
    ageConfirmation: false,
    terms: false,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const interestOptions = [
    'Dating', 'Friendship', 'Networking', 'Casual', 'Serious Relationship', 'Marriage'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else if (name === 'interests') {
      const target = e.target as HTMLInputElement;
      const interestValue = target.value;
      
      setFormData(prev => {
        const currentInterests = [...prev.interests];
        
        if (target.checked) {
          currentInterests.push(interestValue);
        } else {
          const index = currentInterests.indexOf(interestValue);
          if (index > -1) {
            currentInterests.splice(index, 1);
          }
        }
        
        return {
          ...prev,
          interests: currentInterests
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }
    
    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest';
    }
    
    if (!formData.terms) {
      newErrors.terms = 'You must agree to the terms';
    }
    
    if (!formData.ageConfirmation) {
      newErrors.ageConfirmation = 'You must confirm your age';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // Form is valid, do something with the data
      setSubmitted(true);
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Dating Profile
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your dating profile using this form
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-50 p-4 rounded-md mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Success!
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    Your profile has been created successfully.
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        gender: '',
                        interests: [],
                        bio: '',
                        notifications: true,
                        ageConfirmation: false,
                        terms: false,
                      });
                    }}
                    className="text-sm font-medium text-green-600 hover:text-green-500"
                  >
                    Create another profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                      errors.firstName ? 'border-red-300' : ''
                    }`}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                      errors.lastName ? 'border-red-300' : ''
                    }`}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.email ? 'border-red-300' : ''
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                      errors.password ? 'border-red-300' : ''
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                      errors.confirmPassword ? 'border-red-300' : ''
                    }`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Gender Selection */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="mt-1">
                <select
                  name="gender"
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.gender ? 'border-red-300' : ''
                  }`}
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              {errors.gender && (
                <p className="mt-2 text-sm text-red-600">{errors.gender}</p>
              )}
            </div>

            {/* Interests Checkboxes */}
            <div>
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700">
                  What are you interested in?
                </legend>
                <div className="mt-2 space-y-2">
                  {interestOptions.map(option => (
                    <div key={option} className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id={`interest-${option}`}
                          name="interests"
                          type="checkbox"
                          value={option}
                          checked={formData.interests.includes(option)}
                          onChange={handleChange}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor={`interest-${option}`} className="font-medium text-gray-700">
                          {option}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.interests && (
                  <p className="mt-2 text-sm text-red-600">{errors.interests}</p>
                )}
              </fieldset>
            </div>

            {/* Bio Textarea */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <div className="mt-1">
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Brief description for your profile. URLs are hyperlinked.
              </p>
            </div>

            {/* Notifications Toggle */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notifications"
                  name="notifications"
                  type="checkbox"
                  checked={formData.notifications}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="notifications" className="font-medium text-gray-700">
                  Email notifications
                </label>
                <p className="text-gray-500">Get notified when someone matches with you or messages you.</p>
              </div>
            </div>

            {/* Age Confirmation */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="ageConfirmation"
                  name="ageConfirmation"
                  type="checkbox"
                  checked={formData.ageConfirmation}
                  onChange={handleChange}
                  className={`h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 ${
                    errors.ageConfirmation ? 'border-red-300' : ''
                  }`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="ageConfirmation" className="font-medium text-gray-700">
                  Age confirmation
                </label>
                <p className="text-gray-500">I confirm that I am 18 years or older.</p>
                {errors.ageConfirmation && (
                  <p className="mt-1 text-sm text-red-600">{errors.ageConfirmation}</p>
                )}
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={formData.terms}
                  onChange={handleChange}
                  className={`h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 ${
                    errors.terms ? 'border-red-300' : ''
                  }`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  Terms and conditions
                </label>
                <p className="text-gray-500">
                  I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">terms of service</a> and{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">privacy policy</a>.
                </p>
                {errors.terms && (
                  <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormExample; 