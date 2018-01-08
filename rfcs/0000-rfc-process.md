
Status: Draft (as of 2017-01-05)

Type: Process

Github PR: (add HTTPS link here after PR is opened)

Short Name: `0000-rfc-process`

# Summary
[summary]: #summary

The RFC ("Request for Comment") process is how the Dat open source community
comes to (distributed) consensus around technical protocol enhancements and
organizational process.

# Motivation
[motivation]: #motivation

A public RFC process is expected to increase the quality of core technical
protocols and library implementations (by clarifying changes early in the
process and allowing structured review by more individuals), lower the barrier
to additional implementations of the protocols (by clarifying implementation
details and norms not included in the core specification itself), and to make
the development process more transparent, accessible, and scalable to a growing
group of developers and end users.

An additional goal of the process is to empower collaborators who are not core
Dat developers or paid staff to participate in community decision making around
protocols and process. Core developers still have special roles and
responsibilities, but need not be a bottleneck or single-point-of-failure for
the ecosystem as a whole.

# Usage Documentation
[usage-documentation]: #usage-documentation

The process for proposing and debating a new RFC is:

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

RFCs should have a type ("Standard" or "Process") and a status.

# Reference Documentation
[reference-documentation]: #reference-documentation

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

A changelog should be kept in the RFC itself giving the date of any changes of
status.

A template file is provided, but sections can be added or removed as
appropriate for a specific RFC.

# Drawbacks
[drawbacks]: #drawbacks

There are already multiple sources of technical documentation: the Dat
[protocol website][proto-website], the Dat [whitepaper][whitepaper], Dat
website [documentation section][docs], the [discussion repo][discussion-repo]
issues, and the [datprotocol github group][datproto-group] (containing, eg, the
`dat.json` repo/spec). Without consensus and consolidation, this would be "yet
another" place to look.

[proto-website]: https://www.datprotocol.com/
[whitepaper]: https://github.com/datproject/docs/blob/master/papers/dat-paper.md
[docs]: https://docs.datproject.org/
[datproto-group]: https://github.com/datprotocol

# Rationale and alternatives
[alternatives]: #alternatives

**TODO:**

# Unresolved questions
[unresolved]: #unresolved-questions

Who are "core developers"? What is the specific decision making process for
accepting or rejecting a given RFC? Optimistically, it would be clear from
reading a PR discussion thread whether "consensus" has been reached or not, but
this might be ambiguous or intimidating to first-time contributors.

When are or are not accepted RFCs binding? Presumably a technical RFC should indicate

Are "standard"/technical and "process" the right categories and terms to use?
Some RFC systems (like the IETF one) also use terminology like "informational"
(seems like we could rely on blog posts) an "normative". This might be helpful
for documenting things like peer discovery methods, which have intentially not
been specified as part of the formal spec (to make it clear that there is no
single "right way" to do discovery), but they should be documented somewhere.

Some communities eventually subsume the core protocol specification itself into
the RFC process (for example, the official Bittorrent protocol was documented
in a "BEP"). Should dat do this? Or rely on the current (and possibly future)
Dat whitepaper?

Is "RFC" the term we want to use? Could also be "Dat Enhancement Proposal"
(DEP), etc.

# Changelog
[changelog]: #changelog

A brief statemnt about current status can go here, follow by a list of dates
when the status line of this RFC changed (in most-recent-last order).

- 2017-01-08: TODO: First complete draft submitted for review

