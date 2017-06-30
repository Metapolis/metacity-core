
/**
 * Data transfer object with all details about a tweet
 */
export class Tweet {

    /**
     * tweet's identifier
     */
    public id: number;

    /**
     * tweet's creation date
     */
    public createdAt: string;

    /**
     * tweet's author pseudo
     */
    public pseudo: string;

    /**
     * tweet's content
     */
    public text: string;

    /**
     * tweet's category
     */
    public category: string;

    /**
     * tweet's feeling (0-1)
     */
    public feeling: number;

    /**
     * tweet's type
     */
    public type: string;

    /**
     * Twwet's hashtags
     */
    public hashtags: string[];

    /**
     * tweet's mentions
     */
    public mentions: string[];

    /**
     * tweet's tags
     */
    public tags: string[];
}
