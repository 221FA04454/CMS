// Component Registry
// Maps JSON types to React Components and Schema Definitions

import Button from './lib/basic/Button';
import Heading from './lib/basic/Heading';
import Text from './lib/basic/Text';
import Divider from './lib/basic/Divider';
import Container from './lib/layout/Container';
import Section from './lib/layout/Section';
import Image from './lib/media/Image';

import Card from './lib/layout/Card';

export const COMPONENT_REGISTRY = {
  'Section': {
    component: Section,
    label: 'Section',
    category: 'layout',
    defaultProps: {
      padding: '64px',
      backgroundColor: 'transparent',
    },
    propSchema: {
      padding: { type: 'text', label: 'Vertical Padding' },
      backgroundColor: { type: 'color', label: 'Background Color' },
    }
  },
  'Container': {
    component: Container,
    label: 'Container',
    category: 'layout',
    defaultProps: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      flexWrap: 'nowrap',
      gap: '16px',
    },
    propSchema: {
      flexDirection: { 
        type: 'select', 
        label: 'Orientation', 
        options: ['row', 'column', 'row-reverse', 'column-reverse'] 
      },
      justifyContent: {
        type: 'select',
        label: 'Justify Content',
        options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around']
      },
      alignItems: {
        type: 'select',
        label: 'Align Items',
        options: ['stretch', 'flex-start', 'center', 'flex-end']
      },
      flexWrap: {
        type: 'select',
        label: 'Wrap',
        options: ['nowrap', 'wrap', 'wrap-reverse']
      },
      gap: { type: 'text', label: 'Gap (px/rem)' },
    }
  },
  'Card': {
    component: Card,
    label: 'Card',
    category: 'layout',
    defaultProps: {},
    propSchema: {}
  },
  'Heading': {
    component: Heading,
    label: 'Heading',
    category: 'basic',
    defaultProps: {
      text: 'Build Something Amazing',
      level: 'h2',
    },
    propSchema: {
      text: { type: 'textarea', label: 'Content' },
      level: { 
        type: 'select', 
        label: 'Level', 
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] 
      },
    }
  },
  'Text': {
    component: Text,
    label: 'Paragraph',
    category: 'basic',
    defaultProps: {
      content: 'FlexiSite gives you the power to design and develop without writing a single line of code. Leverage enterprise-grade components immediately.',
    },
    propSchema: {
      content: { type: 'textarea', label: 'Content' },
    }
  },
  'Button': {
    component: Button,
    label: 'Button',
    category: 'basic',
    defaultProps: {
      text: 'Get Started',
      variant: 'primary',
    },
    propSchema: {
      text: { type: 'text', label: 'Button Text' },
      variant: { 
        type: 'select', 
        label: 'Variant', 
        options: ['primary', 'secondary', 'danger', 'ghost'] 
      },
      link: { type: 'text', label: 'URL Target' },
    }
  },
  'Divider': {
    component: Divider,
    label: 'Divider',
    category: 'basic',
    defaultProps: {},
    propSchema: {}
  },
  'Image': {
    component: Image,
    label: 'Image',
    category: 'media',
    defaultProps: {
      src: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      alt: 'Placeholder',
    },
    propSchema: {
      src: { type: 'text', label: 'Image URL' },
      alt: { type: 'text', label: 'Alt Text' },
    }
  }
};



export const getComponent = (type) => {
  return COMPONENT_REGISTRY[type]?.component;
};

export const getComponentDef = (type) => {
  return COMPONENT_REGISTRY[type];
};

/**
 * Enterprise Plugin System Hook
 * Allows third-party plugins to inject custom components at runtime
 */
export const registerDynamicComponent = (type, definition) => {
    if (COMPONENT_REGISTRY[type]) {
        console.warn(`[Registry] Component type "${type}" is already registered. Overwriting.`);
    }
    COMPONENT_REGISTRY[type] = definition;
    console.info(`[Registry] Dynamically registered "${type}" component.`);
};
