import type {  ReactElement } from "react";
import { useOutletContext } from "react-router-dom";
type Props = {
  children: ReactElement;
};
type ContextType = {
  isAdmin: true
}
function AdminWrapper({ children }: Props) {
  const isAdmin = useOutletContext<ContextType>()

  return (
    <div className="h-full">
      {isAdmin && (
        children
      )}
    </div>
  );
}

export default AdminWrapper;
