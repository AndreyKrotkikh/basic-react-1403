import { createSelector } from 'reselect'

export const articleSelector = (state) => state.articles
export const articleListSelector = (state) => state.articleList
export const filtersSelector = (state) => state.filters
export const dateRangeSelector = (state) => filtersSelector(state).dateRange
export const selectedSelector = (state) => filtersSelector(state).selected

export const filtratedArticlesSelector = createSelector(
  articleListSelector,
  dateRangeSelector,
  selectedSelector,
  (articles, { from, to }, selected) => {
    console.log('---', 'articles selector')
    console.log(articles)
    return articles.filter((article) => {
      const published = Date.parse(article.date)
      return (
        (!selected.length || selected.find((selected) => selected.value === article.id)) &&
        (!from || !to || (published > from && published < to))
      )
    })
  }
)

const idSelector = (_, { id }) => id
const commentsSelector = (state) => state.comments

export const createCommentSelector = () =>
  createSelector(
    commentsSelector,
    idSelector,
    (comments, id) => comments[id]
  )

export const createArticleSelector = () =>
  createSelector(
    articleSelector,
    idSelector,
    (comments, id) => comments[id]
  )
