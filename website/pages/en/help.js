/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Help(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  const supportLinks = [
    {
      content: `Chat on [Gitter.im](https://gitter.im/datproject/discussions) or [IRC](https://webchat.freenode.net/?channels=dat) (they are the same room!). Connect with the community and find support.`,
      title: 'Join the Chat',
    },
    {
      content: 'See an issue or find something confusing? [Open an issue](https://github.com/datproject/docs/issues).',
      title: 'Improve the Documentation',
    }
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Need help?</h1>
          </header>
          <GridBlock contents={supportLinks} layout="twoColumn" />
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
