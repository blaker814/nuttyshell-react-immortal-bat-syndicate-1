import React, { useContext } from "react"
import "./Article.css"
import { Link, useHistory } from "react-router-dom"
import { Container, Header } from 'semantic-ui-react'
import { ArticleContext } from "./ArticleProvider"

export const Article = ({ article }) => {
    
    const { deleteArticle} = useContext(ArticleContext)
    const history = useHistory()
    return (

        <Container className="article--container" >
        <Header as='h3'>{article.title}</Header>
        <p>Posted by: {article.user.username}</p>
        <p>Date: {new Date(article.date).toLocaleDateString('en-US')}</p>
        <p>{article.synopsis}</p>
                    <div className="article--actions">
                <a href={article.url} target="_blank">
                    Read More
                </a>

                <div className="formBtns">
                    <button id="editArticle--${article.id}" className="editBtn">Edit</button>
                    <button id="deleteArticle--${article.id}" className="trashBtn" onClick={
                        () => {
                            deleteArticle(article.id)
                            .then(() => {
                                history.push("/articles")
                            })}}>🗑️</button>
                </div>
        </div>
    </Container>
    )
}