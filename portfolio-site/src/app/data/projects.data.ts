import type { Project } from './portfolio.models';

export const projects: readonly Project[] = [
	{
		slug: 'ncell-modular',
		name: 'Ncell Modular',
		eyebrow: 'PROFESSIONAL PROJECT',
		category: 'Telecom · Recharge workflows',
		oneLiner: 'Automated scheduled and low-balance recharges through background jobs, webhooks, and Kafka messages.',
		context: 'A telecom recharge system with scheduled top-ups and a threshold-based recharge workflow.',
		problem: 'Users needed balances topped up on selected dates and recharge work triggered when a balance fell below a configured limit.',
		role: 'Developer',
		architecture: 'Hangfire schedules top-ups and triggers webhooks for dated recharges. A threshold-based job publishes a Kafka message when a balance drops below its configured limit.',
		architectureDiagram: {
			title: 'Ncell Modular recharge workflow',
			description: 'Two documented recharge flows: scheduled top-ups through Hangfire webhooks, and low-balance detection that publishes to Kafka.',
			caption: 'Illustrates only the scheduling, webhook, threshold, and Kafka flow described in the résumé.',
			width: 760,
			height: 350,
			nodes: [
				{ id: 'schedule', label: 'Schedule', detail: 'Top-up date', kind: 'entry', x: 30, y: 38, width: 170, height: 68 },
				{ id: 'hangfire-webhook', label: 'Hangfire', detail: 'Scheduled job', kind: 'service', x: 295, y: 38, width: 170, height: 68 },
				{ id: 'webhook', label: 'Webhook', detail: 'Recharge trigger', kind: 'external', x: 560, y: 38, width: 170, height: 68 },
				{ id: 'balance', label: 'Balance check', detail: 'Below threshold', kind: 'entry', x: 30, y: 226, width: 170, height: 68 },
				{ id: 'hangfire-threshold', label: 'Hangfire', detail: 'Scheduled process', kind: 'service', x: 295, y: 226, width: 170, height: 68 },
				{ id: 'kafka', label: 'Kafka topic', detail: 'Recharge message', kind: 'data', x: 560, y: 226, width: 170, height: 68 }
			],
			edges: [
				{ id: 'schedule-job', from: 'schedule', to: 'hangfire-webhook', label: 'date', x1: 200, y1: 72, x2: 295, y2: 72 },
				{ id: 'job-webhook', from: 'hangfire-webhook', to: 'webhook', label: 'trigger', x1: 465, y1: 72, x2: 560, y2: 72 },
				{ id: 'balance-job', from: 'balance', to: 'hangfire-threshold', label: 'threshold', x1: 200, y1: 260, x2: 295, y2: 260 },
				{ id: 'job-kafka', from: 'hangfire-threshold', to: 'kafka', label: 'publish', x1: 465, y1: 260, x2: 560, y2: 260 }
			]
		},
		decisions: [],
		execution: 'Implemented Hangfire scheduling and webhook triggers for dated top-ups, plus a threshold-based process that publishes messages to Kafka.',
		stack: ['C#', '.NET', 'Hangfire', 'Kafka'],
		outcomes: [],
		relatedProjects: [],
		storeLinks: [
			{ platform: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.mventus.ncell.activity&hl=en' },
			{ platform: 'App Store', url: 'https://apps.apple.com/np/app/ncell/id922410448' }
		],
		confidentiality: 'Details summarized from rAcsumAc; confirm sharing scope.',
		featured: true
	},
	{
		slug: 'gibl-banking-intranet',
		name: 'Banking Intranet System (GIBL)',
		eyebrow: 'PROFESSIONAL PROJECT',
		category: 'Banking · Enterprise application',
		oneLiner: 'Improved query performance, background-job stability, and internal email handling in a banking intranet system.',
		context: 'A banking intranet system supporting internal application workflows.',
		problem: 'The résumé identifies complex SQL queries, frequently accessed data and third-party token generation, plus Hangfire timeout/crash issues, as areas addressed.',
		role: 'Developer',
		architecture: 'Work covered SQL query optimization, caching of frequently accessed data and generated third-party tokens, a database schema for resilient error-message logging, custom internal mail capture, and Hangfire job scheduling.',
		architectureDiagram: {
			title: 'Banking intranet system improvements',
			description: 'Documented system areas: intranet data access and caches, SQL storage, Hangfire jobs, resilient error logging, and internal email capture.',
			caption: 'A résumé-based map of the implemented areas; exact production topology is not specified.',
			width: 820,
			height: 390,
			nodes: [
				{ id: 'intranet', label: 'Intranet app', detail: 'Banking system', kind: 'entry', x: 25, y: 155, width: 160, height: 70 },
				{ id: 'data-cache', label: 'Data cache', detail: 'Frequent reads', kind: 'service', x: 250, y: 35, width: 160, height: 70 },
				{ id: 'sql', label: 'SQL queries', detail: 'Optimized access', kind: 'data', x: 250, y: 155, width: 160, height: 70 },
				{ id: 'error-schema', label: 'Error logging', detail: 'Resilient schema', kind: 'data', x: 250, y: 275, width: 160, height: 70 },
				{ id: 'token-cache', label: 'Token cache', detail: 'Third-party tokens', kind: 'service', x: 520, y: 35, width: 160, height: 70 },
				{ id: 'hangfire', label: 'Hangfire', detail: 'Stable background jobs', kind: 'service', x: 520, y: 155, width: 160, height: 70 },
				{ id: 'mail-capture', label: 'Mail capture', detail: 'Internal interception', kind: 'external', x: 520, y: 275, width: 160, height: 70 }
			],
			edges: [
				{ id: 'app-cache', from: 'intranet', to: 'data-cache', x1: 185, y1: 174, x2: 250, y2: 70 },
				{ id: 'app-sql', from: 'intranet', to: 'sql', x1: 185, y1: 190, x2: 250, y2: 190 },
				{ id: 'app-errors', from: 'intranet', to: 'error-schema', x1: 185, y1: 207, x2: 250, y2: 310 },
				{ id: 'app-tokens', from: 'intranet', to: 'token-cache', x1: 185, y1: 170, x2: 520, y2: 70 },
				{ id: 'app-jobs', from: 'intranet', to: 'hangfire', x1: 185, y1: 190, x2: 520, y2: 190 },
				{ id: 'app-email', from: 'intranet', to: 'mail-capture', x1: 185, y1: 210, x2: 520, y2: 310 }
			]
		},
		decisions: [
			{
				title: 'Internal mail capture',
				choice: 'Designed a custom mail-capturing solution to intercept email internally instead of relying on Microsoft Graph.',
				tradeoff: 'The résumé documents the selected approach, but not further alternatives or trade-offs.'
			}
		],
		execution: 'Optimized SQL queries, added caching, designed an error logging schema, stabilized Hangfire jobs and cron schedules, and wrote unit and integration tests for high-risk services.',
		stack: ['C#', '.NET', 'SQL', 'Hangfire'],
		outcomes: [],
		relatedProjects: [],
		storeLinks: [
			{ platform: 'Google Play', url: 'https://play.google.com/store/search?q=global+chautari&c=apps&hl=en' },
			{ platform: 'App Store', url: 'https://apps.apple.com/np/app/global-chautari/id6777895784' }
		],
		confidentiality: 'Details summarized from rAcsumAc; confirm sharing scope.',
		featured: true
	},
	{
		slug: 'access-control-management',
		name: 'Access Control Management System',
		eyebrow: 'PROFESSIONAL PROJECT',
		category: 'Enterprise application · Workflow automation',
		oneLiner: 'Defined operations and applications, then created workflow instances and application tasks from the selected operation.',
		context: 'An access-control system for defining operations and the applications associated with them.',
		problem: 'The system needed to create and execute operation workflows and application task instances based on the selected application and operation.',
		role: 'Developer',
		architecture: 'Workflow Core models the operation-level workflow and the application task instances created for an operation.',
		architectureDiagram: {
			title: 'Access control workflow',
			description: 'A selected application and operation determine the workflow instance and associated application task instances.',
			caption: 'Workflow relationships are represented at the level described in the résumé.',
			width: 760,
			height: 250,
			nodes: [
				{ id: 'selection', label: 'Application + operation', detail: 'User selection', kind: 'entry', x: 25, y: 88, width: 190, height: 70 },
				{ id: 'workflow-core', label: 'Workflow Core', detail: 'Operation workflow', kind: 'service', x: 285, y: 88, width: 190, height: 70 },
				{ id: 'tasks', label: 'Application tasks', detail: 'Dynamic instances', kind: 'data', x: 545, y: 88, width: 190, height: 70 }
			],
			edges: [
				{ id: 'selection-workflow', from: 'selection', to: 'workflow-core', label: 'definition', x1: 215, y1: 123, x2: 285, y2: 123 },
				{ id: 'workflow-tasks', from: 'workflow-core', to: 'tasks', label: 'instances', x1: 475, y1: 123, x2: 545, y2: 123 }
			]
		},
		decisions: [],
		execution: 'Designed operation/application definitions and implemented logic to dynamically create and execute workflow instances and application task instances.',
		stack: ['C#', '.NET', 'Workflow Core'],
		outcomes: [],
		relatedProjects: [],
		confidentiality: 'Details summarized from résumé; confirm sharing scope.',
		featured: true
	},
	{
		slug: 'medical-inventory-system',
		name: 'Medical Inventory System',
		eyebrow: 'PROFESSIONAL PROJECT',
		category: 'Healthcare · Application security',
		oneLiner: 'Addressed VAPT-identified vulnerabilities with rate limiting, concurrent-login restrictions, and Google reCAPTCHA.',
		context: 'A medical inventory application with security findings identified through VAPT assessment.',
		problem: 'The application needed security mechanisms to address vulnerabilities identified during VAPT assessments.',
		role: 'Developer',
		architecture: 'Implemented request rate limiting, concurrent-login restrictions, and Google reCAPTCHA integration. The résumé also notes Angular interface components for daily-user workflows.',
		architectureDiagram: {
			title: 'Medical inventory request safeguards',
			description: 'An incoming inventory request passes through rate limiting and login restrictions, with Google reCAPTCHA integrated as an additional safeguard.',
			caption: 'Security controls are shown in the order described at a conceptual level; implementation topology is not specified.',
			width: 820,
			height: 250,
			nodes: [
				{ id: 'request', label: 'User request', detail: 'Inventory workflow', kind: 'entry', x: 20, y: 88, width: 150, height: 70 },
				{ id: 'rate', label: 'Rate limiting', detail: 'Request control', kind: 'service', x: 220, y: 88, width: 160, height: 70 },
				{ id: 'login', label: 'Login policy', detail: 'Concurrent sessions', kind: 'service', x: 430, y: 88, width: 160, height: 70 },
				{ id: 'inventory', label: 'Inventory app', detail: '.NET / Angular', kind: 'service', x: 640, y: 88, width: 160, height: 70 },
				{ id: 'recaptcha', label: 'Google reCAPTCHA', detail: 'Integrated safeguard', kind: 'external', x: 430, y: 190, width: 160, height: 46 }
			],
			edges: [
				{ id: 'request-rate', from: 'request', to: 'rate', x1: 170, y1: 123, x2: 220, y2: 123 },
				{ id: 'rate-login', from: 'rate', to: 'login', x1: 380, y1: 123, x2: 430, y2: 123 },
				{ id: 'login-app', from: 'login', to: 'inventory', x1: 590, y1: 123, x2: 640, y2: 123 },
				{ id: 'login-recaptcha', from: 'login', to: 'recaptcha', x1: 510, y1: 158, x2: 510, y2: 190 }
			]
		},
		decisions: [],
		execution: 'Implemented the security controls and designed Angular interface components to support daily-user workflows.',
		stack: ['C#', '.NET', 'Angular', 'Google reCAPTCHA'],
		outcomes: [],
		relatedProjects: [],
		confidentiality: 'Details summarized from résumé; confirm sharing scope.',
		featured: true
	},
	{
		slug: 'property-tour-system',
		name: 'Property Tour System',
		eyebrow: 'PROFESSIONAL PROJECT',
		category: 'SaaS · Microservices',
		oneLiner: 'A microservices-based application where users upload property photos and videos and create virtual tours.',
		context: 'A platform for property owners to share media and create virtual property tours.',
		problem: 'Users needed to upload property images and videos and present them as virtual tours.',
		role: 'Developer',
		architecture: 'The résumé describes a microservices-based application supporting media uploads and virtual tour creation. Specific service boundaries, storage, and deployment details are not listed.',
		architectureDiagram: {
			title: 'Property tour workflow',
			description: 'A property owner uploads images and videos, the platform creates a virtual tour, and a viewer accesses the tour.',
			caption: 'Conceptual user flow only; internal service boundaries and storage are not specified in the résumé.',
			width: 820,
			height: 250,
			nodes: [
				{ id: 'owner', label: 'Property owner', detail: 'Media upload', kind: 'entry', x: 25, y: 88, width: 170, height: 70 },
				{ id: 'platform', label: 'Property platform', detail: 'Microservices-based', kind: 'service', x: 240, y: 88, width: 190, height: 70 },
				{ id: 'tour', label: 'Virtual tour', detail: 'Created from media', kind: 'data', x: 475, y: 88, width: 150, height: 70 },
				{ id: 'viewer', label: 'Tour viewer', detail: 'Property audience', kind: 'external', x: 670, y: 88, width: 130, height: 70 }
			],
			edges: [
				{ id: 'owner-platform', from: 'owner', to: 'platform', label: 'images / video', x1: 195, y1: 123, x2: 240, y2: 123 },
				{ id: 'platform-tour', from: 'platform', to: 'tour', label: 'create', x1: 430, y1: 123, x2: 475, y2: 123 },
				{ id: 'tour-viewer', from: 'tour', to: 'viewer', label: 'publish', x1: 625, y1: 123, x2: 670, y2: 123 }
			]
		},
		decisions: [],
		execution: 'Developed the microservices-based application supporting property media uploads and virtual tour creation.',
		stack: ['C#', '.NET', 'Microservices', 'Image/video uploads'],
		outcomes: [],
		relatedProjects: [],
		storeLinks: [
			{ platform: 'Google Play', url: 'https://play.google.com/store/search?q=global+chautari&c=apps&hl=en' },
			{ platform: 'App Store', url: 'https://apps.apple.com/np/app/global-chautari/id6777895784' }
		],
		confidentiality: 'Details summarized from rAcsumAc; confirm sharing scope.',
		featured: true
	}
];