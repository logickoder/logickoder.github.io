import type { CaseStudy } from './types';

const retrostash: CaseStudy = {
  slug: 'retrostash',
  title: 'Retrostash',
  tagline: 'Annotation-driven KMP caching for Retrofit, OkHttp, and Ktor',
  year: 2026,
  role: 'Sole author and maintainer',
  status: 'shipped',
  tech: [
    'Kotlin Multiplatform',
    'Ktor',
    'OkHttp',
    'Retrofit',
    'Maven Central',
    'Swift Package Manager'
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/logickoder/retrostash' },
    { label: 'Project site', href: 'https://logickoder.dev/retrostash' },
    { label: 'Live playground', href: 'https://logickoder.dev/retrostash/playground' },
    { label: 'API docs', href: 'https://logickoder.dev/retrostash/api' }
  ],
  badges: [
    {
      alt: 'Maven Central version',
      src: 'https://img.shields.io/maven-central/v/dev.logickoder/retrostash-core?style=flat-square&color=D2691E&label=maven%20central',
      href: 'https://central.sonatype.com/artifact/dev.logickoder/retrostash-core'
    },
    {
      alt: 'GitHub release',
      src: 'https://img.shields.io/github/v/release/logickoder/retrostash?style=flat-square&color=D2691E&label=release',
      href: 'https://github.com/logickoder/retrostash/releases'
    }
  ],
  summary:
    "Open-source KMP library that handles two pain points stock OkHttp can't: caching non-idempotent queries (POST-as-query, GraphQL, search) and invalidating cached responses when mutations happen. Annotation-driven, converter-agnostic, targets Android, JVM, iOS, and wasmJs.",
  sections: [
    { type: 'heading', level: 2, text: 'Problem' },
    {
      type: 'prose',
      content:
        "OkHttp's stock `Cache` only handles GET, only honors HTTP cache headers, and exposes no programmatic invalidation. Real apps don't fit that model. Search endpoints are POST. GraphQL is POST. Mutation responses change the truth of multiple GET endpoints downstream and there's no clean way to invalidate them atomically."
    },
    {
      type: 'prose',
      content:
        "Existing community solutions for the JVM either tightly coupled to a specific serializer (`Gson` / `Moshi` / `kotlinx`) or assumed a single transport (Retrofit only). None were KMP-ready. So callers were rolling per-app hacks: hand-written response stores, header injection, manual map-of-keys-to-invalidate. Brittle."
    },
    { type: 'heading', level: 2, text: 'Approach' },
    {
      type: 'prose',
      content:
        'Retrostash treats the cache as a first-class system controlled by annotations on the API surface, not a passive layer reacting to HTTP semantics. `@CacheQuery` declares what to cache and how to key it. `@CacheMutate` declares what to invalidate when this call succeeds. The engine sits outside the transport and lets each adapter (OkHttp / Retrofit, Ktor) feed it.'
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `interface SearchApi {
  @CacheQuery(key = "search:{q}", tags = ["search"])
  @POST("/graphql")
  suspend fun search(@Body req: GraphQlRequest): List<Hit>

  @CacheMutate(invalidateTags = ["search"])
  @POST("/items")
  suspend fun createItem(@Body req: CreateItem): Item
}`
    },
    { type: 'heading', level: 2, text: 'Design decisions' },
    { type: 'heading', level: 3, text: 'Converter-agnostic key resolution' },
    {
      type: 'prose',
      content:
        "Retrostash intercepts the raw `RequestBody` (OkHttp) or `HttpRequestBuilder` attributes (Ktor) and resolves `{placeholders}` from `@Path`, `@Query`, `@Body`. It never assumes a serializer. Bodies can be plain Kotlin objects, `Map`s, arrays, JSON bytes. Retrostash extracts the fields it needs without owning the encoder."
    },
    { type: 'heading', level: 3, text: 'Tags for cross-API invalidation' },
    {
      type: 'prose',
      content:
        "A single `@CacheMutate(invalidateTags = [\"orders\"])` clears every cached entry tagged `orders`, regardless of which endpoint produced it. This was the killer feature missing from competitors: mutations in one resource almost always invalidate caches in adjacent ones, and tag-based invalidation is the only sane way to express that without listing each cache key."
    },
    { type: 'heading', level: 3, text: 'Modules' },
    {
      type: 'list',
      items: [
        '`retrostash-core`: engine, key resolver, in-memory store (Android, JVM, iOS targets)',
        '`retrostash-annotations`: `@CacheQuery`, `@CacheMutate`',
        '`retrostash-ktor`: `HttpClient` plugin',
        '`retrostash-okhttp`: `Interceptor` + Retrofit metadata extractor (Android + JVM)'
      ]
    },
    {
      type: 'prose',
      content:
        'Each transport adapter pulls `retrostash-core` + `retrostash-annotations` transitively, so apps only depend on the transport module they use.'
    },
    { type: 'heading', level: 2, text: 'Multiplatform reach' },
    {
      type: 'prose',
      content:
        'The sample app (`:composeApp`) runs on Android, JVM desktop, iOS, and wasmJs in the browser. A segmented control swaps between Ktor, OkHttp, and Retrofit transports against the same cache so behavior is identical across stacks. iOS distribution is a single XCFramework via Swift Package Manager bundling core + annotations + Ktor plugin.'
    },
    { type: 'heading', level: 2, text: 'Outcome' },
    {
      type: 'list',
      items: [
        'Published to Maven Central at `dev.logickoder:retrostash-{okhttp,ktor}:0.0.12`',
        'Published to Swift Package Manager for iOS consumers',
        'Live playground at logickoder.dev/retrostash/playground demonstrating the three transports + tag invalidation',
        'Full KDoc on the public surface; integration tests covering OkHttp, Ktor, mutation invalidation',
        'Solves the POST-cache + mutation-invalidation problem that I and several teams had been hand-rolling for years'
      ]
    },
    { type: 'heading', level: 2, text: 'What I would do next' },
    {
      type: 'list',
      items: [
        'Persistent store backends: currently in-memory; SQLDelight or Room (KMP) for app restarts',
        'Apollo GraphQL adapter: operation-level annotation surface',
        'Cadence policies: per-entry TTL with background revalidation rather than only mutation-driven invalidation'
      ]
    },
    {
      type: 'prose',
      content:
        'Tell me what breaks. Issues at [github.com/logickoder/retrostash](https://github.com/logickoder/retrostash), PRs welcome.'
    }
  ]
};

export default retrostash;
