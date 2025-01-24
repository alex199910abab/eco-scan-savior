import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Recycle, Trash2 } from "lucide-react";

interface ResultsProps {
  material: string;
  onReset: () => void;
}

const materialInfo = {
  plastic: {
    icon: <Recycle className="h-12 w-12 text-eco-primary" />,
    title: "Plastic",
    instructions: "Clean and place in the recycling bin. Remove caps and labels if possible.",
  },
  paper: {
    icon: <Recycle className="h-12 w-12 text-eco-primary" />,
    title: "Paper",
    instructions: "Flatten cardboard and remove any plastic tape. Place in paper recycling.",
  },
  metal: {
    icon: <Recycle className="h-12 w-12 text-eco-primary" />,
    title: "Metal",
    instructions: "Rinse clean and place in recycling bin. Crush if possible to save space.",
  },
  glass: {
    icon: <Recycle className="h-12 w-12 text-eco-primary" />,
    title: "Glass",
    instructions: "Rinse clean and place in glass recycling. Remove caps and corks.",
  },
  "general waste": {
    icon: <Trash2 className="h-12 w-12 text-gray-500" />,
    title: "General Waste",
    instructions: "This item goes in the general waste bin. Consider if it could be reused.",
  },
};

const Results: React.FC<ResultsProps> = ({ material, onReset }) => {
  const info = materialInfo[material as keyof typeof materialInfo] || materialInfo["general waste"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg"
    >
      <div className="flex flex-col items-center text-center">
        {info.icon}
        <h2 className="mt-4 text-2xl font-bold text-gray-900">{info.title}</h2>
        <p className="mt-2 text-gray-600">{info.instructions}</p>
        <Button
          onClick={onReset}
          className="mt-6 bg-eco-primary hover:bg-eco-dark text-white"
        >
          Scan Another Item
        </Button>
      </div>
    </motion.div>
  );
};

export default Results;