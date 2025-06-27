import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  Shield,
  User,
  Key,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Users,
  BookOpen,
  Lock
} from 'lucide-react';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Main Container
const AuthContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 40px;
  color: white;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out;
`;

const AuthHeader = styled.div`
  margin-bottom: 30px;
`;

const AuthTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const AuthSubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 25px;
`;

const InputGroup = styled.div`
  position: relative;
  text-align: left;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: bold;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid transparent;
  color: white;
  padding: 12px 16px;
  padding-left: 45px;
  border-radius: 12px;
  font-size: 16px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  &.error {
    border-color: #f44336;
  }
  
  &.success {
    border-color: #4CAF50;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 0;
  
  &:hover {
    color: white;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 12px;
  margin-top: 5px;
  text-align: left;
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  border: none;
  color: white;
  padding: 15px 30px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    animation: none;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    animation: none;
  }
`;

const DemoCredentials = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
  margin-top: 20px;
  text-align: left;
`;

const DemoTitle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DemoItem = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  opacity: 0.9;
`;

const RoleSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const RoleButton = styled.button`
  flex: 1;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  border: none;
  color: white;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

// Demo credentials
const DEMO_ACCOUNTS = {
  teacher: {
    username: 'teacher@school.edu',
    password: 'teacher123',
    role: 'Teacher'
  },
  admin: {
    username: 'admin@school.edu', 
    password: 'admin123',
    role: 'Administrator'
  }
};

// Main Component
const TeacherAuth = ({ onLogin = () => {} }) => {
  const [selectedRole, setSelectedRole] = useState('teacher');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // Auto-fill demo credentials
    const account = DEMO_ACCOUNTS[role];
    setFormData({
      username: account.username,
      password: account.password
    });
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
      newErrors.username = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const account = Object.values(DEMO_ACCOUNTS).find(
        acc => acc.username === formData.username && acc.password === formData.password
      );
      
      if (account) {
        onLogin({
          username: formData.username,
          role: account.role,
          permissions: account.role === 'admin' ? ['full_access'] : ['classroom_management'],
          timestamp: new Date()
        });
      } else {
        setErrors({
          general: 'Invalid credentials. Please check your email and password.'
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AuthContainer>
      <AuthHeader>
        <AuthTitle>
          <Shield size={32} />
          Teacher Access
          <Users size={32} />
        </AuthTitle>
        <AuthSubtitle>
          Secure login for educators and administrators
        </AuthSubtitle>
      </AuthHeader>

      <RoleSelector>
        <RoleButton 
          active={selectedRole === 'teacher'}
          onClick={() => handleRoleSelect('teacher')}
        >
          <User size={16} />
          Teacher
        </RoleButton>
        <RoleButton 
          active={selectedRole === 'admin'}
          onClick={() => handleRoleSelect('admin')}
        >
          <Shield size={16} />
          Admin
        </RoleButton>
      </RoleSelector>

      <AuthForm onSubmit={handleSubmit}>
        {errors.general && (
          <div style={{ 
            background: 'rgba(244, 67, 54, 0.2)', 
            padding: '10px', 
            borderRadius: '8px',
            color: '#f44336',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} />
            {errors.general}
          </div>
        )}

        <InputGroup>
          <InputLabel>Email Address</InputLabel>
          <InputContainer>
            <InputIcon>
              <User size={16} />
            </InputIcon>
            <Input
              type="email"
              placeholder="Enter your school email"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className={errors.username ? 'error' : ''}
            />
          </InputContainer>
          {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <InputLabel>Password</InputLabel>
          <InputContainer>
            <InputIcon>
              <Key size={16} />
            </InputIcon>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={errors.password ? 'error' : ''}
            />
            <PasswordToggle 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </PasswordToggle>
          </InputContainer>
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </InputGroup>

        <LoginButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                border: '2px solid white', 
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: `${pulse} 1s linear infinite`
              }} />
              Authenticating...
            </>
          ) : (
            <>
              <Lock size={16} />
              Sign In to Dashboard
            </>
          )}
        </LoginButton>
      </AuthForm>

      <DemoCredentials>
        <DemoTitle>
          <BookOpen size={16} />
          Demo Credentials
        </DemoTitle>
        <DemoItem>
          <span>Teacher Account:</span>
          <span>teacher@school.edu / teacher123</span>
        </DemoItem>
        <DemoItem>
          <span>Admin Account:</span>
          <span>admin@school.edu / admin123</span>
        </DemoItem>
      </DemoCredentials>
    </AuthContainer>
  );
};

export default TeacherAuth;