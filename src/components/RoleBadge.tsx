import React from 'react';

interface RoleBadgeProps {
  role: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'soft';
}

const RoleBadge: React.FC<RoleBadgeProps> = ({
  role,
  className,
  size = 'md',
  variant = 'solid',
}) => {
  const normalizedRole = role.toLowerCase();

  const getRoleConfig = () => {
    switch (normalizedRole) {
      case 'admin':
      case 'administrator':
        return {
          label: 'Admin',
          colors: {
            solid: 'bg-red-600 text-white border-red-600',
            outline: 'bg-transparent text-red-600 border-red-600',
            soft: 'bg-red-100 text-red-800 border-red-200',
          },
          icon: (
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-.257-.257A6 6 0 0118 8zM2 8a6 6 0 1010.743 5.743L12 14l-.257-.257A6 6 0 012 8zm8-2a2 2 0 100 4 2 2 0 000-4z" clipRule="evenodd" />
            </svg>
          ),
        };
      case 'user':
      case 'resident':
      case 'member':
      case 'citizen':
        return {
          label: 'Citizen',
          colors: {
            solid: 'bg-blue-600 text-white border-blue-600',
            outline: 'bg-transparent text-blue-600 border-blue-600',
            soft: 'bg-blue-100 text-blue-800 border-blue-200',
          },
          icon: (
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          ),
        };
      case 'org':
      case 'organization':
      case 'company':
        return {
          label: 'Organization',
          colors: {
            solid: 'bg-orange-600 text-white border-orange-600',
            outline: 'bg-transparent text-orange-600 border-orange-600',
            soft: 'bg-orange-100 text-orange-800 border-orange-200',
          },
          icon: (
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          ),
        };
      case 'moderator':
      case 'mod':
      case 'warden':
        return {
          label: 'Moderator',
          colors: {
            solid: 'bg-green-600 text-white border-green-600',
            outline: 'bg-transparent text-green-600 border-green-600',
            soft: 'bg-green-100 text-green-800 border-green-200',
          },
          icon: (
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ),
        };
      case 'guest':
        return {
          label: 'Guest',
          colors: {
            solid: 'bg-gray-600 text-white border-gray-600',
            outline: 'bg-transparent text-gray-600 border-gray-600',
            soft: 'bg-gray-100 text-gray-800 border-gray-200',
          },
          icon: (
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />            </svg>
          ),
        };
      default:
        return {
          label: role.charAt(0).toUpperCase() + role.slice(1),
          colors: {
            solid: 'bg-purple-600 text-white border-purple-600',
            outline: 'bg-transparent text-purple-600 border-purple-600',
            soft: 'bg-purple-100 text-purple-800 border-purple-200',
          },
          icon: (
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ),
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'md':
        return 'px-2.5 py-1 text-sm';
      case 'lg':
        return 'px-3 py-1.5 text-base';
      default:
        return 'px-2.5 py-1 text-sm';
    }
  };

  const roleConfig = getRoleConfig();
  const colorClasses = roleConfig.colors[variant];
  const sizeClasses = getSizeClasses();

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border transition-colors ${colorClasses} ${sizeClasses} ${className || ''}`}
      role="status"
      aria-label={`Role: ${roleConfig.label}`}
    >
      {roleConfig.icon}
      {roleConfig.label}
    </span>
  );
};

// Utility component for role comparison/hierarchy
export const RoleHierarchy: React.FC<{
  roles: string[];
  className?: string;
}> = ({ roles, className }) => {
  const roleOrder = ['guest', 'user', 'member', 'resident', 'moderator', 'warden', 'admin', 'administrator'];
  
  const sortedRoles = [...roles].sort((a, b) => {
    const aIndex = roleOrder.indexOf(a.toLowerCase());
    const bIndex = roleOrder.indexOf(b.toLowerCase());
    return bIndex - aIndex; // Higher index = higher role
  });

  return (
    <div className={`flex flex-wrap gap-2 ${className || ''}`}>
      {sortedRoles.map((role, index) => (
        <RoleBadge key={`${role}-${index}`} role={role} size="sm" />
      ))}
    </div>
  );
};

// Component to show role with permissions hint
export const RoleWithPermissions: React.FC<{
  role: string;
  permissions?: string[];
  className?: string;
}> = ({ role, permissions, className }) => {
  const getPermissionText = () => {
    if (!permissions || permissions.length === 0) return '';
    
    const permissionMap: { [key: string]: string } = {
      read: 'View',
      write: 'Create/Edit',
      delete: 'Delete',
      moderate: 'Moderate',
      admin: 'Full Access',
    };

    return permissions.map(p => permissionMap[p] || p).join(', ');
  };

  return (
    <div className={`flex items-center space-x-2 ${className || ''}`}>
      <RoleBadge role={role} />
      {permissions && permissions.length > 0 && (
        <span className="text-xs text-gray-500" title={getPermissionText()}>
          ({getPermissionText()})
        </span>
      )}
    </div>
  );
};

export default RoleBadge;
