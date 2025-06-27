import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  Heart,
  User,
  Key,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Users,
  Home,
  Lock,
  UserCheck,
  GraduationCap,
  Shield
} from 'lucide-react';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
  40%, 43% { transform: translateY(-10px); }
  70% { transform: translateY(-5px); }
  90% { transform: translateY(-2px); }
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
  max-width: 450px;
  margin: 0 auto;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out;
`;

const AuthHeader = styled.div`
  margin-bottom: 30px;
`;

const AuthTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const AuthSubtitle = styled.p`
  font-size: 18px;
  opacity: 0.9;
  margin: 0 0 10px 0;
`;

const WelcomeMessage = styled.p`
  font-size: 14px;
  opacity: 0.8;
  margin: 0;
  line-height: 1.4;
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
  padding: 15px 20px;
  padding-left: 50px;
  border-radius: 15px;
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
    transform: translateY(-2px);
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
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
  
  &:hover {
    color: white;
    transform: translateY(-50%) scale(1.1);
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 12px;
  margin-top: 8px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #E91E63, #C2185B);
  border: none;
  color: white;
  padding: 18px 35px;
  border-radius: 15px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
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
  border-radius: 15px;
  padding: 20px;
  margin-top: 25px;
  text-align: left;
`;

const DemoTitle = styled.div`
  font-weight: bold;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
`;

const DemoFamily = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FamilyHeader = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
`;

const FamilyDetails = styled.div`
  font-size: 12px;
  opacity: 0.9;
  line-height: 1.3;
`;

const ChildrenList = styled.div`
  margin-top: 8px;
  padding-left: 20px;
`;

const ChildItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  margin-bottom: 4px;
  opacity: 0.8;
`;

const QuickFillButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 11px;
  cursor: pointer;
  margin-top: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

// Demo credentials
const DEMO_FAMILIES = {
  rivera: {
    username: 'maria.rivera@email.com',
    password: 'parent123',
    family: 'Rivera Family',
    children: [
      { name: 'Alex Rivera', grade: '5th Grade', age: 10 },
      { name: 'Sofia Rivera', grade: '3rd Grade', age: 8 }
    ]
  },
  chen: {
    username: 'david.chen@email.com',
    password: 'parent123',
    family: 'Chen Family',
    children: [
      { name: 'Liam Chen', grade: '6th Grade', age: 11 }
    ]
  },
  johnson: {
    username: 'sarah.johnson@email.com',
    password: 'parent123',
    family: 'Johnson Family',
    children: [
      { name: 'Emma Johnson', grade: '4th Grade', age: 9 },
      { name: 'Noah Johnson', grade: '7th Grade', age: 12 }
    ]
  }
};

// Main Component
const ParentAuth = ({ onLogin = () => {} }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const quickFill = (familyKey) => {
    const family = DEMO_FAMILIES[familyKey];
    setFormData({
      username: family.username,
      password: family.password
    });
    setErrors({});
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
      const family = Object.values(DEMO_FAMILIES).find(
        fam => fam.username === formData.username && fam.password === formData.password
      );
      
      if (family) {
        onLogin({
          username: formData.username,
          family: family.family,
          children: family.children,
          role: 'parent',
          permissions: ['view_child_progress', 'view_projects', 'receive_notifications'],
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
          <Heart size={36} style={{ animation: `${bounce} 2s infinite` }} />
          Parent Portal
          <Home size={36} />
        </AuthTitle>
        <AuthSubtitle>
          Watch your child's AI learning journey! 🌟
        </AuthSubtitle>
        <WelcomeMessage>
          See their amazing AI creations, track learning progress, and celebrate their achievements together.
        </WelcomeMessage>
      </AuthHeader>

      <AuthForm onSubmit={handleSubmit}>
        {errors.general && (
          <div style={{ 
            background: 'rgba(244, 67, 54, 0.2)', 
            padding: '12px', 
            borderRadius: '10px',
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
          <InputLabel>Parent Email</InputLabel>
          <InputContainer>
            <InputIcon>
              <User size={18} />
            </InputIcon>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className={errors.username ? 'error' : ''}
            />
          </InputContainer>
          {errors.username && (
            <ErrorMessage>
              <AlertCircle size={12} />
              {errors.username}
            </ErrorMessage>
          )}
        </InputGroup>

        <InputGroup>
          <InputLabel>Password</InputLabel>
          <InputContainer>
            <InputIcon>
              <Key size={18} />
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
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </PasswordToggle>
          </InputContainer>
          {errors.password && (
            <ErrorMessage>
              <AlertCircle size={12} />
              {errors.password}
            </ErrorMessage>
          )}
        </InputGroup>

        <LoginButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <div style={{ 
                width: '18px', 
                height: '18px', 
                border: '2px solid white', 
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: `${pulse} 1s linear infinite`,
                marginRight: '10px'
              }} />
              Signing In...
            </>
          ) : (
            <>
              <Heart size={18} />
              Sign In to See Progress
            </>
          )}
        </LoginButton>
      </AuthForm>

      <DemoCredentials>
        <DemoTitle>
          <GraduationCap size={18} />
          Demo Parent Accounts
        </DemoTitle>
        
        {Object.entries(DEMO_FAMILIES).map(([key, family]) => (
          <DemoFamily key={key}>
            <FamilyHeader>
              <Users size={14} />
              {family.family}
            </FamilyHeader>
            <FamilyDetails>
              <strong>Email:</strong> {family.username}<br />
              <strong>Password:</strong> {family.password}
            </FamilyDetails>
            <ChildrenList>
              {family.children.map((child, index) => (
                <ChildItem key={index}>
                  <UserCheck size={10} />
                  {child.name} ({child.grade}, Age {child.age})
                </ChildItem>
              ))}
            </ChildrenList>
            <QuickFillButton onClick={() => quickFill(key)}>
              Quick Fill
            </QuickFillButton>
          </DemoFamily>
        ))}
      </DemoCredentials>
    </AuthContainer>
  );
};

export default ParentAuth;