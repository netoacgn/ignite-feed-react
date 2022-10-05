import { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Comment } from './Comment';
import { Avatar } from './Avatar';

import styles from './Post.module.css';

export function Post({ author, publishedAt, content }) {
    const [comments, setComments] = useState([
        'Post muito legal, parabéns!'
    ]);
    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = format(publishedAt, "d' de 'LLLL' às 'HH':'mm'h'", {
        locale: ptBR,
    });

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment() {
        event.preventDefault();

        setComments([...comments, newCommentText]);
        setNewCommentText('');
    };

    function handleNewCommentChange() {
        setNewCommentText(event.target.value)
    };

    function deleteComment(commentToDelete) {
        const commentsWithoutDeletedOne = comments.filter(item => {
            return item !== commentToDelete;
        });

        setComments(commentsWithoutDeletedOne);
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />

                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {content.map(item => {
                    if (item.type === 'paragraph') {
                        return (
                            <p key={item.content}>{item.content}</p>
                        )
                    } else if (item.type === 'link') {
                        return (
                            <p key={item.content}><a href="#">{item.content}</a></p>
                        )
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    name='comment'
                    placeholder='Deixe um comentário'
                    onChange={handleNewCommentChange}
                    value={newCommentText}
                />

                <footer>
                    <button type='submit'>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(item => {
                    return (
                        <Comment
                            key={item}
                            content={item}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>

        </article >
    )
}