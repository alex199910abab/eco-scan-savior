export interface ClassificationResult {
  label: string;
  score: number;
}

export type ClassificationOutput = ClassificationResult[] | ClassificationResult;

export interface MaterialDetectionProps {
  imageData: string;
  onResult: (material: string) => void;
}