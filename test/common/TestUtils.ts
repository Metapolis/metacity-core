/**
 * Contains utils method for testing
 */
export class TestUtils {

    /**
     * Generate a random string with size
     * @param size size of string generated
     * @returns {string} string generated
     */
    public static randomString(size: number): string {
        const alphaChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let generatedString = "";
        for (let i = 0; i < size; i++) {
            generatedString += alphaChars[TestUtils.randomInt(alphaChars.length)];
        }

        return generatedString;
    }

    /**
     * Generate a random integer
     * @param rightBound limit
     * @returns {number} integer generated
     */
    public static randomInt(rightBound: number): number {
        return Math.floor(Math.random() * rightBound);
    }
}
