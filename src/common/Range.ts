/**
 * Contains start and end value
 *
 * @param <T> king of object used in range
 */
export class Range<T> {

    /**
     * Start range
     */
    private start: T;

    /**
     * End range
     */
    private end: T;

    /**
     * Constructor
     *
     * @param start start range
     * @param end end range
     */
    constructor(start: T, end: T) {
        this.start = start;
        this.end = end;
    }

    /**
     * Getter range start
     *
     * @return start value
     */
    public getStart(): T {
        return this.start;
    }

    /**
     * Getter range end
     *
     * @return end value
     */
    public getEnd(): T {
        return this.end;
    }
}
