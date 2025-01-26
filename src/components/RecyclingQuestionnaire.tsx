import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface QuestionnaireProps {
  detectedMaterial: string;
  onComplete: (answers: QuestionnaireAnswers) => void;
}

export interface QuestionnaireAnswers {
  mainMaterial: string;
  cleanliness: "clean" | "dirty";
  condition: "intact" | "damaged";
}

const RecyclingQuestionnaire: React.FC<QuestionnaireProps> = ({
  detectedMaterial,
  onComplete,
}) => {
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    mainMaterial: detectedMaterial,
    cleanliness: "clean",
    condition: "intact",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(answers);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Help us better guide you</h3>

          <div className="space-y-2">
            <Label>What is the main material of your item?</Label>
            <RadioGroup
              value={answers.mainMaterial}
              onValueChange={(value) =>
                setAnswers({ ...answers, mainMaterial: value })
              }
              className="flex flex-col space-y-2"
            >
              {["plastic", "metal", "glass", "paper"].map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <RadioGroupItem value={material} id={material} />
                  <Label htmlFor={material} className="capitalize">
                    {material}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Is the item clean?</Label>
            <RadioGroup
              value={answers.cleanliness}
              onValueChange={(value) =>
                setAnswers({
                  ...answers,
                  cleanliness: value as "clean" | "dirty",
                })
              }
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="clean" id="clean" />
                <Label htmlFor="clean">Yes, it's clean</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dirty" id="dirty" />
                <Label htmlFor="dirty">No, it has residue</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>What's the condition of the item?</Label>
            <RadioGroup
              value={answers.condition}
              onValueChange={(value) =>
                setAnswers({
                  ...answers,
                  condition: value as "intact" | "damaged",
                })
              }
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intact" id="intact" />
                <Label htmlFor="intact">Intact/Good condition</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="damaged" id="damaged" />
                <Label htmlFor="damaged">Damaged/Poor condition</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-eco-primary hover:bg-eco-dark text-white"
        >
          Submit
        </Button>
      </form>
    </motion.div>
  );
};

export default RecyclingQuestionnaire;