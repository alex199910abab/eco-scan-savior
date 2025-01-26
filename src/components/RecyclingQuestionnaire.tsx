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
  size: "small" | "medium" | "large";
  hasLabels: "yes" | "no";
  hasMultipleMaterials: "yes" | "no";
}

const RecyclingQuestionnaire: React.FC<QuestionnaireProps> = ({
  detectedMaterial,
  onComplete,
}) => {
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    mainMaterial: detectedMaterial,
    cleanliness: "clean",
    condition: "intact",
    size: "medium",
    hasLabels: "no",
    hasMultipleMaterials: "no",
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

          <div className="space-y-2">
            <Label>What's the size of the item?</Label>
            <RadioGroup
              value={answers.size}
              onValueChange={(value) =>
                setAnswers({
                  ...answers,
                  size: value as "small" | "medium" | "large",
                })
              }
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small">Small (fits in one hand)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium (two hands)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large">Large (needs lifting)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Does the item have any labels or stickers?</Label>
            <RadioGroup
              value={answers.hasLabels}
              onValueChange={(value) =>
                setAnswers({
                  ...answers,
                  hasLabels: value as "yes" | "no",
                })
              }
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="labels-yes" />
                <Label htmlFor="labels-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="labels-no" />
                <Label htmlFor="labels-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Is the item made of multiple materials?</Label>
            <RadioGroup
              value={answers.hasMultipleMaterials}
              onValueChange={(value) =>
                setAnswers({
                  ...answers,
                  hasMultipleMaterials: value as "yes" | "no",
                })
              }
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="multiple-yes" />
                <Label htmlFor="multiple-yes">Yes (e.g., plastic and metal)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="multiple-no" />
                <Label htmlFor="multiple-no">No, single material</Label>
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