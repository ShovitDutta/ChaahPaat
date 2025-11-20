declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
interface PropertyDescriptor {
  syntax?: string;
  inherits?: boolean;
  initialValue?: string;
}
interface CSS {
  registerProperty?: (descriptor: PropertyDescriptor) => void;
}