import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

// You can’t use Hooks inside a class component.
// React Router v6 only provides hooks for navigation
export const withNavigate = (Component) => {
  return (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return (
      <Component
        {...props}
        location={location}
        navigate={navigate}
        params={params}
      />
    );
  };
};
