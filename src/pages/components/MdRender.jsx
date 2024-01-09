import React from 'react';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

function MDRender({ content }) {
  return <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />;
}

export default MDRender;
