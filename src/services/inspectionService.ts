import type { InspectionResult } from '../types'

// Simulated inspection service — clearly a demo-only mock (modelVersion: YOLO11n-demo)
export async function inspectWasteImage(imageDataUrl: string, opts?: { forceLowConfidence?: boolean }): Promise<InspectionResult> {
  // Reference the image argument to avoid unused-param TS errors in this demo service
  void imageDataUrl
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1200))

  const low = opts?.forceLowConfidence ?? false

  if (low) {
    return {
      material: 'PCB / Computer Board',
      confidence: 61,
      visibleCondition: 'Moderate to poor',
      visibleIssues: ['Corrosion near edges', 'Missing connectors', 'Some burn marks'],
      modelVersion: 'YOLO11n-demo',
      notes: 'Low confidence — visual cues were partially occluded or noisy.'
    }
  }

  return {
    material: 'PCB / Computer Board',
    confidence: 94,
    visibleCondition: 'Moderate',
    visibleIssues: ['Minor corrosion detected', 'Some component damage visible'],
    modelVersion: 'YOLO11n-demo',
    notes: 'Inspection simulated — only visible features considered.'
  }
}
