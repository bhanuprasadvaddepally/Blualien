import { Helmet } from 'react-helmet-async';

const description =
  'BLUALIEN is an AI-native company building products, creative systems, technology and media.';

export default function Seo({
  title = 'BLUALIEN | Building what comes next.',
  noIndex = false,
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex ? <meta name="robots" content="noindex" /> : null}
    </Helmet>
  );
}
