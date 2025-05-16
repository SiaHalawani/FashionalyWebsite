import { useState, useEffect } from 'react';
import components from '../../../../../CSS/components.module.css';
import { getFollowedStories, createStory } from '../../../../../../BackendIntegration/StoriesHighlights/storyAxios'; // ✅ adjust path

export default function FollowersStories() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchStories = async () => {
        setLoading(true);
        try {
            const res = await getFollowedStories();
            setStories(res.data); // or just res if your endpoint returns array
        } catch (err) {
            console.error("❌ Failed to fetch stories", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddStory = async () => {
        const mediaURL = prompt("Paste your story image/video URL:");
        if (!mediaURL) return;

        try {
            const newStory = {
                mediaURL,
                mediaType: "image", // or "video"
                caption: "New Story 🚀",
                visibility: "followers"
            };
            await createStory(newStory);
            await fetchStories(); // refresh stories after adding
        } catch (err) {
            console.error("❌ Failed to add story", err);
        }
    };

    useEffect(() => {
        fetchStories();
    }, []);

    return (
        <div className={components.storiesContainer}>
            {loading ? (
                <p>Loading stories...</p>
            ) : (
                <div className={components.storiesList}>
                    {/* ➕ Add Story Circle */}
                    <div className={components.storyItem}>
                        <div className={components.addStoryCircle} onClick={handleAddStory}>
                            <span className={components.plusIcon}>+</span>
                        </div>
                        <p>You</p>
                    </div>

                    {/* 🧍 Followers' Stories */}
                    {stories.map((story) => (
                        <div key={story.id} className={components.storyItem}>
                            <img src={story.mediaURL} alt={story.caption} className={components.storyImage} />
                            <p>{story.caption}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
