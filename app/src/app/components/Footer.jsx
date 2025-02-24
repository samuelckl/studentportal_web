import { FaRegCopyright } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-gray-400 text-white p-1 flex justify-center items-center shadow-md">
      <div className="flex items-center gap-2">
        <FaRegCopyright className="text-ml" />
        <h2 className="text-sm">2025 Sam Kin Lok Chan. All rights reserved.</h2>
      </div>
    </div>
  );
}

export default Footer;