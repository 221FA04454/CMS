# Plugin Ecosystem API Contract

This document outlines the API contracts for the FlexiSite CMS Plugin Ecosystem.

## 1. Marketplace
**Path**: `/api/plugins/marketplace` | **Method**: `GET`
**Response**:
```json
[
  {
    "pluginId": "flexi-carousel",
    "name": "Carousel Slider",
    "version": "1.0.0",
    "description": "A highly customizable image carousel.",
    "category": "Media",
    "author": "Flexi Team",
    "bundle": "/plugins/carousel.bundle.js",
    "thumbnail": "https://...",
    "downloads": 12400
  }
]
```

## 2. Installation
**Path**: `/api/plugins/install` | **Method**: `POST`
**Payload**:
```json
{
  "tenantId": "tenant_123",
  "pluginId": "flexi-carousel"
}
```
**Response**:
```json
{
  "pluginId": "flexi-carousel",
  "name": "Carousel Slider",
  "version": "1.0.0",
  "components": [
    {
      "id": "flexi-carousel-comp-1",
      "type": "CarouselSlider",
      "displayName": "Carousel Slider",
      "category": "Media",
      "bundle": "/plugins/carousel.bundle.js",
      "props": {}
    }
  ]
}
```

## 3. Removal
**Path**: `/api/plugins/remove` | **Method**: `POST`
**Payload**:
```json
{
  "tenantId": "tenant_123",
  "pluginId": "flexi-carousel"
}
```
**Response**:
```json
{ "success": true }
```

## 4. Installed Plugins
**Path**: `/api/plugins?tenantId={id}` | **Method**: `GET`
**Response**: Array of plugin manifest objects currently installed by the tenant.
