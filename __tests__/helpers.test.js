const { checkUrl, checkHeaders, presentData } = require('../helpers');

const checkMyHeaders = require('check-my-headers');

jest.mock('check-my-headers');

describe("Check headers returns just message", () => {
    test('only message returned', async () => {
        const results = {messages: null, headers: null, status: null};
        checkMyHeaders.mockReturnValue(results);
        expect(await checkHeaders("https://google.com")).toEqual(results.messages);
    });
})

describe("URL check fails or passes", () => {
    test('test that url is returned', () => {
        expect(checkUrl("https://google.com")).toBe("https://google.com");
        expect(checkUrl("http://google.com")).toBe("http://google.com");
        expect(checkUrl("https://google.com:3000")).toBe("https://google.com:3000");
        expect(checkUrl("http://localhost:3000")).toBe("http://localhost:3000");
        expect(checkUrl("https://google.com/something")).toBe("https://google.com/something");
        expect(checkUrl("https://google.com/something?par=this")).toBe("https://google.com/something?par=this");
    });
    test('test should return error', () => {
        expect(() => { checkUrl('') }).toThrow();
        expect(() => { checkUrl('h') }).toThrow();
        expect(() => { checkUrl('www.google.com') }).toThrow();
        expect(() => { checkUrl(2) }).toThrow();
        expect(() => { checkUrl([]) }).toThrow();
    });
})

describe("How data is presented", () => {
    test('test that url is returned', () => {
        var data = [
            { msg: 'Remove field: server', type: 'error' },
            { msg: 'Missing field: content-security-policy', type: 'error' },
            { msg: 'Missing field: referrer-policy', type: 'error' }
        ]
        var expectedData = ["Issue found: Remove field: server (error)", "Issue found: Missing field: content-security-policy (error)", "Issue found: Missing field: referrer-policy (error)"]
        expect(presentData(data)).toStrictEqual(expectedData);
    });
}) 
