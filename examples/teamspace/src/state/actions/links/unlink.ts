import { LinkableTarget, State, TextCardTarget } from 'state/constants';
import { shapeTargetToCardTarget } from 'state/helpers';

function removeLinks(state: State, target: LinkableTarget) {
  const { links } = state.store.cards[target.id].props;
  for (const linkSourceId in links) {
    delete links[linkSourceId];
    delete state.store.cards[linkSourceId].props.backlinks[target.id];
  }
}

function removeLinksBetween(state: State, a: LinkableTarget, b: LinkableTarget) {
  const { links: aLinks } = state.store.cards[a.id].props;
  for (const linkSourceId in aLinks) {
    if (linkSourceId === b.id) {
      delete aLinks[linkSourceId];
    }
  }
  delete state.store.cards[b.id].props.backlinks[a.id];

  const { links: bLinks } = state.store.cards[b.id].props;
  for (const linkSourceId in bLinks) {
    if (linkSourceId === a.id) {
      delete bLinks[linkSourceId];
    }
  }
  delete state.store.cards[a.id].props.backlinks[b.id];
}

export function unlink(state: State) {
  const linkableTargets = state.store.editing.selectedIds
    .map((target) => shapeTargetToCardTarget(state, target))
    .filter((target): target is TextCardTarget => !!target);

  const [a, b] = linkableTargets;

  if (a && state.store.editing.selectedIds.length === 1) {
    removeLinks(state, a);
  } else if (a && b && state.store.editing.selectedIds.length === 2) {
    removeLinksBetween(state, a, b);
  } else {
    console.warn('[unlink] too many targets or mismatch');
  }
}
