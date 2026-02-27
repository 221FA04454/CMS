# Enterprise Settings API Contract

This document outlines the API contracts for the FlexiSite CMS Enterprise Settings, reflecting the payload structures managed by the frontend state stores (Zustand).

## 1. Organization
**Path**: `/api/org?tenantId={id}` | **Method**: `GET`
**Response**:
```json
{
  "tenantId": "tenant_1",
  "name": "Acme Corp",
  "description": "Global SaaS Provider",
  "industry": "Technology",
  "contactEmail": "admin@acmecorp.com",
  "locale": "en-US",
  "timezone": "America/Los_Angeles",
  "dateFormat": "MM/DD/YYYY",
  "branding": {
    "logoUrl": "...",
    "faviconUrl": "...",
    "primaryColor": "#4f46e5",
    "secondaryColor": "#10b981",
    "themeMode": "system"
  }
}
```

**Path**: `/api/org/update` | **Method**: `PATCH`
**Payload**: (Partial of properties defined above)

## 2. Members
**Path**: `/api/members?tenantId={id}` | **Method**: `GET`
**Response**:
```json
[
  {
    "userId": "u1",
    "tenantId": "tenant_1",
    "name": "Alice Admin",
    "email": "alice@acme.com",
    "role": "owner",
    "status": "active",
    "invitedAt": "2023-01-01T00:00:00.000Z",
    "joinedAt": "2023-01-02T00:00:00.000Z"
  }
]
```

**Path**: `/api/members/invite` | **Method**: `POST`
**Payload**: `{ "email": "user@domain.com", "role": "editor" }`

**Path**: `/api/members/:userId/role` | **Method**: `PATCH`
**Payload**: `{ "role": "admin" }`

**Path**: `/api/members/:userId` | **Method**: `DELETE`

## 3. Security & Audit
**Path**: `/api/audit?tenantId={id}` | **Method**: `GET`
**Response**:
```json
[
  {
    "logId": "a1",
    "tenantId": "tenant_1",
    "userId": "u1",
    "userName": "Alice Admin",
    "action": "Login Settings Updated",
    "category": "security",
    "metadata": { "2FA": true },
    "ip": "192.168.1.1",
    "device": "Chrome on macOS",
    "timestamp": "2023-05-01T12:00:00.000Z"
  }
]
```

**Path**: `/api/security/logins?tenantId={id}` | **Method**: `GET`
**Response**:
```json
[
  {
    "id": "l1",
    "timestamp": "2023-05-01T10:00:00.000Z",
    "location": "San Francisco, US",
    "ip": "192.168.1.1",
    "device": "Chrome",
    "status": "Success"
  }
]
```

**Path**: `/api/security/forceLogout` | **Method**: `POST`
**Payload**: `{ "tenantId": "tenant_1" }`

## 4. Notifications
**Path**: `/api/notifications/settings` | **Method**: `GET` or `PATCH`
**Payload / Response**:
```json
{
  "emailNotifications": true,
  "webhookNotifications": false,
  "slackIntegration": true,
  "deploymentFailureAlerts": true,
  "domainIssuesAlerts": true,
  "analyticsSpikesAlerts": false,
  "webhookUrl": "",
  "slackChannel": "#alerts"
}
```
