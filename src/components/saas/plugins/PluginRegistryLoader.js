import { COMPONENT_REGISTRY } from './registry.jsx';

// 1. Initialize global registry
window.FlexiPluginRegistry = {
  components: COMPONENT_REGISTRY,
  
  /**
   * Registers a new component dynamically at runtime
   * @param {string} componentId - Unique identifier (e.g. "CarouselSlider")
   * @param {object} componentDef - Component definition { component, label, category, defaultProps, propSchema }
   */
  register(componentId, componentDef) {
      if (this.components[componentId]) {
          console.warn(`[FlexiPluginRegistry] Component ${componentId} is already registered. Overwriting.`);
      }
      this.components[componentId] = componentDef;
      console.info(`[FlexiPluginRegistry] Dynamically registered plugin: ${componentId}`);
  }
};

/**
 * Sandbox Wrapper for executing third-party plugin code
 */
export class FlexiSandbox {
    static safeRegister() {
        try {
            // In a real system, you would evaluate the bundle within an iframe 
            // or use the Function constructor with restricted scope.
            // For now, we simulate executing the bundle string which supposedly contains:
            // `module.exports.register(FlexiPluginRegistry);`
            
            console.log("[Sandbox] Executing plugin code securely...");
            
            // Dummy simulation for demo wrapper
            // A real bundle might use UMD/CJS and we'd inject window.FlexiPluginRegistry
        } catch (error) {
            console.error("[Sandbox Error] Plugin failed to load securely.", error);
        }
    }
}
