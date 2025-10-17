interface ToasterMessageProps {
  title: string;
  description?: string;
}

export const ToastMessage = ({ title, description }: ToasterMessageProps) => {
  return (
    <pre className="mt-2 flex w-[340px] flex-col gap-4 rounded-md p-4">
      <small className="font-semibold">{title}</small>
      <code className="dark:text-white">{description}</code>
    </pre>
  );
};
