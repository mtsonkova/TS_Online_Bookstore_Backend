export interface Menu {
	start(): void;
	printMenuHeader(): void;
}

export const ExamConstants = {
    RESOURCE_BUNDLE_BASE_NAME: "exam.labels"
} as const;