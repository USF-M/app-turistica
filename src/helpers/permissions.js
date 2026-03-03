export const hasPermission = (role, action, rolePermissions = {}) => {
    if (!role) return false;

    const permissions = rolePermissions[role]?.permissions || [];
    if (permissions.includes("routes:*") || permissions.includes("*")) return true;
    if (permissions.includes(action)) return true;

    const [resource, operation, scope] = action.split(":");
    if (!scope) return false;

    const wildcardAction = `${resource}:${operation}:any`;
    return permissions.includes(wildcardAction);
};