import Subject from '#models/subject'
import { DateTime } from 'luxon'
import { CacheService } from './cache_service.ts'

const GRAPH_CACHE_KEY = 'subject_dependency_graph'

export class SubjectDependencyGraphService {
  constructor(protected cacheService: CacheService) {}

  async buildGraph() {
    const subjects = await Subject.query().preload('prerequisites')

    const subjectGraph: Record<string, string[]> = {}

    for (const subject of subjects) {
      subjectGraph[subject.id] = []

      if (subject.prerequisites.length === 0) continue

      for (const prereq of subject.prerequisites) {
        subjectGraph[subject.id].push(prereq.id)
      }
    }

    return subjectGraph
  }

  async getGraph() {
    const now = DateTime.now()
    const expiresAt = now.plus({ hours: 6 })
    return await this.cacheService.remember(GRAPH_CACHE_KEY, expiresAt, () => this.buildGraph())
  }

  async invalidateGraphCache() {
    await this.cacheService.invalidate(GRAPH_CACHE_KEY)
  }

  async checkForCircularDependency(subjectId: string, prerequisiteId: string): Promise<boolean> {
    const graph = await this.getGraph()

    const visited: Record<string, boolean> = {}
    const stack: string[] = [prerequisiteId]

    while (stack.length > 0) {
      const currentNode = stack.pop()

      if (!currentNode) continue

      if (currentNode === subjectId) return true

      if (visited[currentNode]) continue

      visited[currentNode] = true

      if (graph[currentNode]) {
        for (const prereq of graph[currentNode]) {
          stack.push(prereq)
        }
      }
    }

    return false
  }
}
