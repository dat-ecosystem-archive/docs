
This folder (part of the `dat-docs` repository at
https://github.com/datproject/dat-docs) contains a series of proposed (and
eventually accepted) "Requests for Comment" (RFC) documents for the Dat
Protocol and ecosystem.

For now this process is as simple and informal; as the number of dat developers
and users grows, it may become more formal. Inspirations for this process
include:

- [Bittorrent Enhancement Proposals (BEP)](http://bittorrent.org/beps/bep_0001.html)
- [Rust RFC Process](https://github.com/rust-lang/rfcs)
- [Python Enhancement Proposal](https://www.python.org/dev/peps/pep-0001/)


## The Process

TL;DR: write up an RFC markdown file, submit a github PR, revise per review,
community either accepts (merges PR) or does not (closes PR).

* Fork this git repository
* Copy `rfcs/template.md` to `text/0000-my-proposal.md` (don't chose the "next"
  number, use zero; `my-proposal` should be a stub identifier for the proposal)
* Fill in the RFC template. The more details you can fill in at the begining,
  the more feedback reviewers can leave; on the other hand, the sooner you put
  your ideas down in writing, the faster others can point out issues or related
  efforts.
* Submit a github pull request for discussion. The proposal will likely be
  ammended based on review and comments. The PR will be tagged to indicate
  RFC type and status.
* Build consensus. This part of the process is not bounded in time, and will
  likely involve both discussion on the PR comment thread and elsewhere (IRC,
  etc).
* Consider drafting or prototyping an implementation to demonstrate your
  proposal and work out all the details. This step isn't necessary, however: a
  proposer does not need to be a developer.
* If consensus seems to have emerged (for or against the proposal), a team
  member will assign an RFC number, update the status, and merge the PR.
* Small tweaks (grammar, clarifications) to a merged RFC can take place as
  regular github PRs; revisiting or significantly revising should take place as
  a new RFC.

RFCs should have a type:

* **Standard** for technical changes to the protocol, on-disk formats, or
  public APIs.
* **Process** for formalizing community processes or other (technical or
  non-technical) decisions. For example, a security vulnerability reporting
  policy, a process for handling conflicts of interest, or procedures for
  mentoring new developers.

The status of an RFC can be:

* **Draft**: writen up, open PR for discussion
* **Active**: PR accepted; adopted or intended for implementation in mainline
  libraries and clients as appropriate
* **Closed**: PR was closed without merging; either consensus was against, a
  decision was postponed, or the authors withdrew their proposal.
* **Superseded**: a formerly "active" RFC has been made obsolete by a new
  active RFC; the new RFC should specify specific old RFCs that it would
  supersede.

