import { linkify, clampText } from "../src/utils/text";

describe("clampText", () => {
  it("короткий текст целиком, длинный — по строкам и по словам с многоточием", () => {
    expect(clampText("раз\nдва", 4, 100)).toEqual({ text: "раз\nдва", cut: false });
    expect(clampText("1\n2\n3\n4\n5", 3, 100)).toEqual({ text: "1\n2\n3…", cut: true });
    expect(clampText("слово слово слово", 4, 12)).toEqual({ text: "слово слово…", cut: true });
    expect(clampText("1\n\n\n2", 2, 100)).toEqual({ text: "1\n\n\n2", cut: false });
  });
});

describe("linkify", () => {
  it("голые ссылки и markdown-ссылки, хвостовая пунктуация не в ссылке, не-http — текстом", () => {
    expect(linkify("см. https://a.b/c, и всё")).toEqual([{ text: "см. " }, { url: "https://a.b/c", text: "https://a.b/c" }, { text: ", и всё" }]);
    expect(linkify("PR [#24](https://github.com/o/r/pull/24).")).toEqual([{ text: "PR " }, { url: "https://github.com/o/r/pull/24", text: "#24" }, { text: "." }]);
    expect(linkify("(https://x.y/z)")).toEqual([{ text: "(" }, { url: "https://x.y/z", text: "https://x.y/z" }, { text: ")" }]);
    expect(linkify("[x](javascript:alert(1))")).toEqual([{ text: "[x](javascript:alert(1))" }]);
    expect(linkify("")).toEqual([]);
  });
});
