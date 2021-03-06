// @flow
import { normalize } from 'normalizr'
import { articles } from '../schema/schema'

import { FETCH_ARTICLE_SUMMARY, FETCH_ARTICLE_SUMMARY_ERROR } from '../constants/actionTypes'
import type { ArticleSummary } from '../flowtypes/stateTypes'
import type { ArticlesAction } from '../flowtypes/actionTypes'

export const fetchArticleSummary =
  () => (dispatch: Function) =>
    fetch('https://jimmylv.github.io/api/index.json')
      .then(res => res.json())
      .then(json => dispatch({ type: FETCH_ARTICLE_SUMMARY, payload: json }))
      .catch(err => dispatch({ type: FETCH_ARTICLE_SUMMARY_ERROR, payload: new Error(err.message) }))

const initialArticle = {
  id: '/2011-11-11-hello-world/',
  meta: {
    title: 'Hello World!',
    layout: 'post',
    tags: ['hello', 'world'],
  },
  content: 'Hell0 W0rld!',
}

const initialArticleSummary = {
  categories: [{ name: '思考', posts: [initialArticle] }],
  tags: [{ name: 'hello', size: 1, posts: [initialArticle] }],
  paginator: [initialArticle],
}

function articleSummaryReducer(state: ArticleSummary = initialArticleSummary,
                               action: ArticlesAction) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ARTICLE_SUMMARY: {
      const normalizedData = normalize(payload, articles)
      console.info('normalized articles', normalizedData)
      return { ...payload }
    }
    case FETCH_ARTICLE_SUMMARY_ERROR:
      console.warn('Failed to fetch article list: ', payload)
      return state
    default:
      return state
  }
}

export default articleSummaryReducer