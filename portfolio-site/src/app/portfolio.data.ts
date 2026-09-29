export const focusFilters = [
  'All',
  'API design',
  'Architecture',
  'Data',
  'Quality'
] as const;

export type FocusFilter = (typeof focusFilters)[number];
export type FocusCategory = Exclude<FocusFilter, 'All'>;

type CodeTone = 'attribute' | 'keyword' | 'type' | 'value' | 'comment';

interface CodeLine {
  readonly text: string;
  readonly tone: CodeTone;
}

export interface FocusArea {
  readonly id: string;
  readonly category: FocusCategory;
  readonly title: string;
  readonly description: string;
  readonly file: string;
  readonly accent: 'coral' | 'blue' | 'lime' | 'lavender';
  readonly snippet: readonly CodeLine[];
}

export const portfolioProfile = {
  fullName: 'Bigya Maharjan',
  initials: 'BM',
  firstName: 'Bigya',
  lastName: 'Maharjan',
  role: 'Backend software developer',
  specialty: 'C# / .NET',
  headline: 'Reliable backend systems,',
  subheadline: 'built for the real world.',
  about: "I'm Bigya Maharjan, a backend software developer focused on C# and .NET. I enjoy designing clear APIs, building dependable services, and making the systems behind products easier to understand and evolve.",
  email: 'bigya@example.com',
  heroImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1100&q=90',
  heroImageAlt: 'Developer workstation with code on screen; replace with a personal photo or project image',
  technologies: ['C#', '.NET', 'API design', 'Backend systems']
} as const;

export interface ApproachStep {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export const approachSteps: readonly ApproachStep[] = [
  {
    id: 'shape-api',
    title: 'Shape the API',
    description: 'Clear contracts, thoughtful validation, predictable behavior.'
  },
  {
    id: 'build-service',
    title: 'Build the service',
    description: 'Maintainable C#/.NET services designed around real needs.'
  },
  {
    id: 'make-dependable',
    title: 'Make it dependable',
    description: 'Testing and observability that support long-term change.'
  }
];

export const focusAreas: readonly FocusArea[] = [
  {
    id: 'api-design',
    category: 'API design',
    title: 'Clear API contracts',
    description: 'Consistent endpoints, explicit validation, and responses clients can rely on.',
    file: 'OrdersController.cs',
    accent: 'coral',
    snippet: [
      { text: '[HttpGet("{id:guid}")]', tone: 'attribute' },
      { text: 'public async Task<IActionResult> Get(', tone: 'keyword' },
      { text: '    Guid id, CancellationToken token)', tone: 'value' },
      { text: 'var order = await store.FindAsync(id, token);', tone: 'type' },
      { text: 'return order is null ? NotFound() : Ok(order);', tone: 'comment' }
    ]
  },
  {
    id: 'service-architecture',
    category: 'Architecture',
    title: 'Services with boundaries',
    description: 'Small, understandable units with dependencies that stay explicit.',
    file: 'OrdersService.cs',
    accent: 'blue',
    snippet: [
      { text: 'public sealed class OrdersService(', tone: 'keyword' },
      { text: '    IOrderStore store, ILogger<OrdersService> log)', tone: 'value' },
      { text: '{', tone: 'value' },
      { text: '    public Task<Order?> FindAsync(', tone: 'type' },
      { text: '        Guid id, CancellationToken token)', tone: 'comment' }
    ]
  },
  {
    id: 'data-workflows',
    category: 'Data',
    title: 'Predictable data flows',
    description: 'Queries and background work designed for clarity, cancellation, and safe retries.',
    file: 'OrderQueries.cs',
    accent: 'lime',
    snippet: [
      { text: 'var recentOrders = await db.Orders', tone: 'keyword' },
      { text: '    .Where(order => order.CreatedAt >= since)', tone: 'value' },
      { text: '    .OrderByDescending(order => order.CreatedAt)', tone: 'type' },
      { text: '    .Take(pageSize)', tone: 'attribute' },
      { text: '    .ToListAsync(cancellationToken);', tone: 'comment' }
    ]
  },
  {
    id: 'engineering-quality',
    category: 'Quality',
    title: 'Confidence to change',
    description: 'Useful tests and observable behavior that make production easier to support.',
    file: 'OrdersApiTests.cs',
    accent: 'lavender',
    snippet: [
      { text: '[Fact]', tone: 'attribute' },
      { text: 'public async Task Missing_order_returns_404()', tone: 'keyword' },
      { text: '{', tone: 'value' },
      { text: '    var response = await client.GetAsync(', tone: 'type' },
      { text: '        $"/api/orders/{missingId}");', tone: 'comment' }
    ]
  }
];