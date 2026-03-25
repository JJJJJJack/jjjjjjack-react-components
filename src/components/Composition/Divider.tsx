export function Divider({ noMargin = false }: { noMargin?: boolean } = {}) {
  return <hr className="jrc-Divider" data-no-margin={noMargin || undefined} />;
}
