import { IndexingFrame } from '../core/IndexingFrame';
import { Notifiable } from '../core/Notifiable';
import { SFacet } from '../core/SFacet';
import { SFrameTarget } from '../core/SFrameTarget';
import { SIndexing } from '../core/SIndexing';
import { SNumeric } from '../core/SNumeric';
import { STarget } from '../core/STarget';
import { STargeter } from '../core/STargeter';
import { STextual } from '../core/STextual';
import { SToggling } from '../core/SToggling';
import { STrigger } from '../core/STrigger';
import { NumberPolicy } from '../util/NumberPolicy';
import { Tracer } from '../util/Tracer';
export declare class Facets extends Tracer {
    static TITLE_CONTENT_ACTIVE: string;
    times: Facets.Times;
    doTrace: boolean;
    titleTargeters: any;
    titleTrees: any;
    root: IndexingFrame;
    notifiable: Notifiable;
    rootTargeter: STargeter;
    /**
     *
     * @param {string} msg
     */
    doTraceMsg(msg: string): void;
    constructor(top: string, trace: boolean);
    buildApp(app: Facets.FacetsApp): void;
    activateContentTree(title: string): void;
    addContentTree(add: STarget): void;
    putTitleTargeters(t: STargeter): void;
    onRetargeted: (p1: string) => void;
    callOnRetargeted(): void;
    newTextualTarget(title: string, c: Facets.TextualCoupler): STarget;
    newTogglingTarget(title: string, c: Facets.TogglingCoupler): STarget;
    newNumericTarget(title: string, c: Facets.NumericCoupler): STarget;
    newTriggerTarget(title: string, c: Facets.TargetCoupler): STarget;
    newTargetGroup(title: string, members: STarget[]): STarget;
    updatedTarget(target: STarget, c: Facets.TargetCoupler): void;
    newIndexingTarget(title: string, c: Facets.IndexingCoupler): STarget;
    getIndexingState(title: string): Facets.IndexingState;
    indexingFrames: number;
    newIndexingFrame(p: Facets.IndexingFramePolicy): STarget;
    getTargetFramed(title: string): any;
    titleTarget(title: string): STarget;
    attachFacet(title: string, facetUpdated: any): void;
    updateTargetState(title: string, update: any): void;
    notifyTargetUpdated(title: string): void;
    updateTargetWithNotify(title: string, update: any): void;
    getTargetState(title: string): any;
    setTargetLive(title: string, live: boolean): void;
    isTargetLive(title: string): boolean;
    _newFrameTarget(title: string, toFrame: any, editTargets: any[]): STarget;
}
export declare namespace Facets {
    interface FacetsApp {
        getContentTrees(): any;
        onRetargeted(activeTitle: string): any;
        buildLayout(): any;
    }
    interface TargetCoupler {
        targetStateUpdated?: (p1: any, p2: string) => void;
    }
    interface IndexingState {
        uiSelectables: string[];
        indexed: any;
    }
    interface IndexingFramePolicy {
        indexingTitle?: string;
        getIndexables: () => any[];
        frameTitle?: string;
        newUiSelectable?: (p1: any) => string;
        newFrameTargets?: () => STarget[];
        newIndexedTreeTitle?: (p1: any) => string;
        newIndexedTree?: (p1: any, p2: string) => STarget;
    }
    class LocalIndexingFrame extends IndexingFrame {
        p: Facets.IndexingFramePolicy;
        constructor(title: string, indexing: SIndexing, p: Facets.IndexingFramePolicy);
        lazyElements(): STarget[];
        /**
         *
         * @param {*} indexed
         * @return {*}
         */
        newIndexedTargets(indexed: any): STarget;
    }
    class Times {
        __parent: any;
        doTime: boolean;
        resetWait: number;
        then: number;
        start: number;
        restarted: boolean;
        debug: boolean;
        setResetWait(millis: number): void;
        /**
         * The time since the last auto-reset.
         * <p>Interval for reset set by {@link #resetWait}.
         * @return {number}
         */
        elapsed(): number;
        /**
         * Print {@link #elapsed()} followed by the message.
         * @param {string} msg
         */
        traceElapsed(msg: string): void;
        newMillis(): number;
        constructor(__parent: any);
    }
    class _LocalFrameTarget extends SFrameTarget {
        newIndexedTargets: STarget[];
        constructor(title: string, toFrame: any, newIndexedTargets: STarget[]);
        /**
         *
         * @return {Array}
         */
        lazyElements(): STarget[];
    }
    interface TextualCoupler extends Facets.TargetCoupler {
        passText?: string;
        getText?: (p1: string) => string;
        isValidText?: (p1: string, p2: string) => boolean;
    }
    interface TogglingCoupler extends Facets.TargetCoupler {
        passSet: boolean;
    }
    interface NumericCoupler extends Facets.TargetCoupler {
        passValue: number;
        min: number;
        max: number;
    }
    interface IndexingCoupler extends Facets.TargetCoupler {
        passIndex: number;
        getIndexables: (p1: string) => any[];
        newUiSelectable?: (p1: any) => string;
    }
    class Facets$0 implements Notifiable {
        __parent: any;
        /**
         *
         * @param {*} notice
         */
        notify(notice: any): void;
        /**
         *
         * @return {string}
         */
        title(): string;
        constructor(__parent: any);
    }
    class Facets$1 extends SIndexing.Coupler {
        __parent: any;
        thenIndexables: any[];
        /**
         *
         * @param {SIndexing} i
         * @return {Array}
         */
        getIndexables(i: SIndexing): any[];
        constructor(__parent: any);
    }
    class Facets$2 extends IndexingFrame {
        __parent: any;
        /**
         *
         * @return {Array}
         */
        lazyElements(): STarget[];
        constructor(__parent: any, __arg0: any, __arg1: any);
    }
    namespace Facets$2 {
        class Facets$2$0 extends STextual.Coupler {
            __parent: any;
            /**
             *
             * @param {STextual} t
             * @return {string}
             */
            getText(t: STextual): string;
            /**
             *
             * @param {STextual} t
             * @param {string} text
             * @return {boolean}
             */
            isValidText(t: STextual, text: string): boolean;
            constructor(__parent: any);
        }
    }
    class Facets$3 extends STextual.Coupler {
        private c;
        __parent: any;
        /**
         *
         * @param {STextual} target
         */
        textSet(target: STextual): void;
        /**
         *
         * @param {STextual} t
         * @return {string}
         */
        getText(t: STextual): string;
        /**
         *
         * @param {STextual} t
         * @param {string} text
         * @return {boolean}
         */
        isValidText(t: STextual, text: string): boolean;
        constructor(__parent: any, c: any);
    }
    class Facets$4 extends SToggling.Coupler {
        private c;
        __parent: any;
        /**
         *
         * @param {SToggling} target
         */
        stateSet(target: SToggling): void;
        constructor(__parent: any, c: any);
    }
    class Facets$5 extends SNumeric.Coupler {
        private c;
        __parent: any;
        /**
         *
         * @param {SNumeric} n
         */
        valueSet(n: SNumeric): void;
        /**
         *
         * @param {SNumeric} n
         * @return {NumberPolicy}
         */
        policy(n: SNumeric): NumberPolicy;
        constructor(__parent: any, c: any);
    }
    class Facets$6 extends STrigger.Coupler {
        private c;
        __parent: any;
        /**
         *
         * @param {STrigger} t
         */
        fired(t: STrigger): void;
        constructor(__parent: any, c: any);
    }
    class Facets$7 extends SIndexing.Coupler {
        private c;
        __parent: any;
        /**
         *
         * @param {SIndexing} i
         * @return {Array}
         */
        getIndexables(i: SIndexing): any[];
        /**
         *
         * @param {SIndexing} target
         */
        indexSet(target: SIndexing): void;
        /**
         *
         * @param {SIndexing} i
         * @return {Array}
         */
        getFacetSelectables(i: SIndexing): string[];
        constructor(__parent: any, c: any);
    }
    class Facets$8 extends SIndexing.Coupler {
        private p;
        __parent: any;
        thenIndexables: any[];
        thenSelectables: any[];
        /**
         *
         * @param {SIndexing} i
         * @return {Array}
         */
        getIndexables(i: SIndexing): any[];
        /**
         *
         * @param {SIndexing} i
         * @return {Array}
         */
        getFacetSelectables(i: SIndexing): string[];
        constructor(__parent: any, p: any);
    }
    class Facets$9 implements SFacet {
        private facetUpdated;
        __parent: any;
        id: number;
        /**
         *
         * @param {*} target
         */
        retarget(target: STarget): void;
        /**
         *
         * @return {string}
         */
        toString(): string;
        constructor(__parent: any, facetUpdated: any);
    }
    class Facets$10 extends SFrameTarget {
        private asTargets;
        __parent: any;
        /**
         *
         * @return {Array}
         */
        lazyElements(): STarget[];
        constructor(__parent: any, __arg0: any, __arg1: any, asTargets: any);
    }
}
