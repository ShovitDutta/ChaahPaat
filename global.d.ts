declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

// Suppress CSS @property warnings
interface PropertyDescriptor {
  syntax?: string;
  inherits?: boolean;
  initialValue?: string;
}

interface CSS {
  registerProperty?: (descriptor: PropertyDescriptor) => void;
}
