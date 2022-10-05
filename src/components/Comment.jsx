import { ThumbsUp, Trash } from 'phosphor-react';

import styles from './Comment.module.css';
import { Avatar } from './Avatar';

export function Comment({ content, onDeleteComment }) {
    function handleDeleteComment() {
        onDeleteComment(content);
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src='https://github.com/netoacgn.png' />

            <div className={styles.commentBox}>

                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Diogo Fernandes</strong>
                            <time title='04 de outubro às 10:33' dateTime='2022-10-04 10:33:00'>Cerca de 1h atrás</time>
                        </div>

                        <button onClick={handleDeleteComment} title='Deletar comentário'>
                            <Trash size={24} />
                        </button>
                    </header>
                    <p>{content}</p>
                </div>

                <footer>
                    <button>
                        <ThumbsUp />
                        Aplaudir <span>20</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}