import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Recycle, Trash2, Package, Leaf, Battery } from "lucide-react";
import { motion } from "framer-motion";

interface MaterialInfo {
  icon: JSX.Element;
  title: string;
  description: string;
  instructions: string[];
}

const materials: MaterialInfo[] = [
  {
    icon: <Recycle className="h-8 w-8 text-blue-500" />,
    title: "Plastic",
    description: "Different types of plastic require different recycling processes.",
    instructions: [
      "Clean containers before recycling",
      "Remove caps and labels when possible",
      "Check the recycling number (1-7) on the bottom",
      "Flatten containers to save space"
    ]
  },
  {
    icon: <Recycle className="h-8 w-8 text-gray-600" />,
    title: "Metal",
    description: "Metal is one of the most valuable recyclable materials.",
    instructions: [
      "Rinse containers to remove food residue",
      "Crush cans to save space",
      "Remove paper labels when possible",
      "Separate different types of metals"
    ]
  },
  {
    icon: <Recycle className="h-8 w-8 text-green-500" />,
    title: "Glass",
    description: "Glass can be recycled indefinitely without loss in quality.",
    instructions: [
      "Rinse thoroughly",
      "Remove caps and corks",
      "Sort by color if required",
      "Don't break glass before recycling"
    ]
  },
  {
    icon: <Recycle className="h-8 w-8 text-yellow-600" />,
    title: "Paper",
    description: "Paper can be recycled 5-7 times before fibers become too short.",
    instructions: [
      "Keep paper clean and dry",
      "Remove plastic windows from envelopes",
      "Flatten cardboard boxes",
      "Remove tape and staples"
    ]
  },
  {
    icon: <Leaf className="h-8 w-8 text-green-600" />,
    title: "Organic",
    description: "Organic waste can be composted into nutrient-rich soil.",
    instructions: [
      "Separate food scraps from other waste",
      "Include fruit/vegetable scraps",
      "Add yard waste like leaves and grass",
      "Avoid meat and dairy in home composting"
    ]
  },
  {
    icon: <Package className="h-8 w-8 text-orange-500" />,
    title: "Composites / Non-recyclables",
    description: "Some materials are difficult or impossible to recycle.",
    instructions: [
      "Try to avoid purchasing these items",
      "Look for recyclable alternatives",
      "Reuse when possible",
      "Dispose in general waste as last resort"
    ]
  },
  {
    icon: <Battery className="h-8 w-8 text-red-500" />,
    title: "Batteries",
    description: "Batteries contain hazardous materials and must be disposed properly.",
    instructions: [
      "Never throw in regular trash",
      "Use designated battery recycling points",
      "Tape terminal ends of lithium batteries",
      "Keep different battery types separate"
    ]
  },
  {
    icon: <Package className="h-8 w-8 text-purple-500" />,
    title: "E-waste",
    description: "Electronic waste contains valuable and hazardous materials.",
    instructions: [
      "Use certified e-waste recyclers",
      "Remove batteries before recycling",
      "Delete personal data from devices",
      "Keep cables and accessories together"
    ]
  },
  {
    icon: <Package className="h-8 w-8 text-pink-500" />,
    title: "Textile",
    description: "Textiles can often be reused or recycled into new products.",
    instructions: [
      "Donate clean, wearable items",
      "Use textile recycling bins",
      "Consider upcycling old clothes",
      "Remove non-textile parts (buttons, zippers)"
    ]
  }
];

const Materials = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Recycling Materials Guide</h1>
          <p className="text-lg text-gray-600">
            Learn how to properly recycle different types of materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material, index) => (
            <motion.div
              key={material.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {material.icon}
                    <CardTitle>{material.title}</CardTitle>
                  </div>
                  <CardDescription>{material.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {material.instructions.map((instruction, i) => (
                      <li key={i}>{instruction}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Materials;