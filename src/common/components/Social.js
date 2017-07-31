import React, { Component } from 'react';
import styles from "./index.css";


export default class Social extends Component {
	render() {
		const { srcView, srcComment, srcLike, views_count, comments_count, likes_count } = this.props

		return (
		  <div className={styles.social}>
		    <img src={srcView} className={styles.img_social}/>
		    <span className={styles.count_social}>{views_count}</span>

		    <img src={srcComment} className={styles.img_social}/>
		    <span className={styles.count_social}>{comments_count}</span>

		    <img src={srcLike} className={styles.img_social}/>
		    <span className={styles.count_social}>{likes_count}</span>
		  </div>
		);
	}
}
