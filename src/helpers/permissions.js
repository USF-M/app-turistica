export const hasPermission = (role, action, rolePermissions = {}) => {
    if (!role || !action) return false;

    const permissions = rolePermissions[role]?.permissions || [];
    if (permissions.includes("*") || permissions.includes("routes:*")) return true;
    if (permissions.includes(action)) return true;

    const [resource, operation, scope] = action.split(":");

    if (resource && permissions.includes(`${resource}:*`)) return true;

    if (!scope) return false;

    const wildcardAction = `${resource}:${operation}:any`;
    return permissions.includes(wildcardAction);
};