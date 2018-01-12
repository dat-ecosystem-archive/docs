#!/usr/bin/env sh

pandoc --filter pandoc-citeproc --bibliography=dat-paper.bib --variable classoption=twocolumn --variable papersize=a4paper -s dat-paper.md -t latex -o dat-paper.latex

pandoc --filter pandoc-citeproc --bibliography=dat-paper.bib --variable classoption=twocolumn --variable papersize=a4paper -s dat-paper.md -o dat-paper.pdf

pandoc --filter pandoc-citeproc --bibliography=dat-paper.bib --variable classoption=twocolumn --variable papersize=a4paper -s sleep.md -t latex -o sleep.latex

pandoc --filter pandoc-citeproc --bibliography=dat-paper.bib --variable classoption=twocolumn --variable papersize=a4paper -s sleep.md -o sleep.pdf
