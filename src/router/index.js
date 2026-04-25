import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/pre-assessment',
      name: 'pre-assessment',
      component: () => import('../views/PreAssessmentView.vue')
    },
    {
      path: '/learning-path',
      name: 'learning-path',
      component: () => import('../views/LearningPathView.vue')
    },
    {
      path: '/subjects',
      name: 'subjects',
      component: () => import('../views/SubjectsView.vue')
    },
    {
      path: '/subjects/:subject',
      name: 'subject-detail',
      component: () => import('../views/SubjectDetailView.vue')
    },
    {
      path: '/progress',
      name: 'progress',
      component: () => import('../views/ProgressView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/ai-recommendation',
      name: 'ai-recommendation',
      component: () => import('../views/AIRecommendationView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../views/PrivacyPolicyView.vue')
    },
    {
      path: '/learning-content',
      name: 'learning-content',
      component: () => import('../views/LearningContentView.vue')
    },
    {
      path: '/usage-help',
      name: 'usage-help',
      component: () => import('../views/UsageHelpView.vue')
    },
    {
      path: '/ai-test',
      name: 'ai-test',
      component: () => import('../views/AITestView.vue')
    },
    {
      path: '/ai-testing',
      name: 'ai-testing',
      component: () => import('../views/AITestingView.vue')
    },
    {
      path: '/ai-config',
      name: 'ai-config',
      component: () => import('../views/AIConfigView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/ai-learning-analysis',
      name: 'ai-learning-analysis',
      component: () => import('../views/AILearningAnalysisView.vue')
    }
  ]
})

export default router