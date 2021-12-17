import React from "react";
import { render, fireEvent, screen } from '../common/test-utils'
import GreenScoreLabel from "./GreenScoreLabel";
import {getByTestId} from "@testing-library/react";

describe('green score label', () => {
    test('open popover', () => {
        const {container} = render(<GreenScoreLabel greenScore={0.2} isDetail />)
        const popover = container.firstChild.getElementsByClassName('MuiSvgIcon-root')[0]
        fireEvent.mouseEnter(popover)
        expect(screen.getByTestId('green_score__label__detail__popover')).toBeInTheDocument();
    });

    test('close popover', () => {
        const {container} = render(<GreenScoreLabel greenScore={0.2} isDetail />)
        const popover = container.firstChild.getElementsByClassName('MuiSvgIcon-root')[0]
        fireEvent.mouseEnter(popover)
        fireEvent.mouseLeave(popover)
    });

    test('color: greenScore < 1', () => {
        render(<GreenScoreLabel greenScore={0.2} isDetail />)
        expect(screen.getByTestId('score-1')).toBeInTheDocument();
    })

    test('color: greenScore < 1.5', () => {
        render(<GreenScoreLabel greenScore={1.4} isDetail />)
        expect(screen.getByTestId('score-1_5')).toBeInTheDocument();
    })

    test('color: greenScore < 2', () => {
        render(<GreenScoreLabel greenScore={1.9} isDetail />)
        expect(screen.getByTestId('score-2')).toBeInTheDocument();
    })

    test('color: greenScore < 2.5', () => {
        render(<GreenScoreLabel greenScore={2.4} isDetail />)
        expect(screen.getByTestId('score-2_5')).toBeInTheDocument();
    })

    test('color: greenScore < 3', () => {
        render(<GreenScoreLabel greenScore={2.9} isDetail />)
        expect(screen.getByTestId('score-3')).toBeInTheDocument();
    })

    test('color: greenScore > 3', () => {
        render(<GreenScoreLabel greenScore={10} isDetail />)
        expect(screen.getByTestId('score-4')).toBeInTheDocument();
    })
})