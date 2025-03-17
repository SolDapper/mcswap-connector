import $ from "jquery";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import "./mcswap-connector.css";
class mcswapConnector {
  constructor(_wallets_=[],emitter=false){
    this.wallets=[];
    this.emitter=emitter;
    this._wallets_=_wallets_;
    if(_wallets_.includes("phantom")){this.wallets.push({id:"phantom",label:"Phantom",inapp:async(agent)=>{return /Phantom/i.test(agent);},installed:async()=>{return !!window.solana},provider:async()=>{return window.solana;},link:"https://phantom.app/ul/browse/"+encodeURIComponent("https://"+window.location.hostname+window.location.pathname+"#mcswap-connect-phantom")+"?ref="+encodeURIComponent("https://"+window.location.hostname),icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAADJCAYAAACJxhYFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGl2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuYTZhNjM5NiwgMjAyNC8wMy8xMi0wNzo0ODoyMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0wNy0wNFQxOToxNTo1Ni0wNDowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDktMjhUMjI6NTM6NTYtMDQ6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDktMjhUMjI6NTM6NTYtMDQ6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmI5OWUzMjJjLWIyZjEtN2M0Zi05M2Q1LTRhODljMWEzZDYwMSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjg1YzQ0OTgxLThkNzItZTM0Zi1hNGRmLTY3Y2Y5MzQ5NzM0YyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjY2N2MyNDU3LTVmMGEtMzU0Ni04YjJhLTBjYjU2OTdhNmZjZiI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjY3YzI0NTctNWYwYS0zNTQ2LThiMmEtMGNiNTY5N2E2ZmNmIiBzdEV2dDp3aGVuPSIyMDIzLTA3LTA0VDE5OjE1OjU2LTA0OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMCAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQyNjE3MGU3LTFlMDAtMTY0ZC1iMmE2LWIxYzc4NDI2ODMzNSIgc3RFdnQ6d2hlbj0iMjAyMy0wNy0wNFQxOToyNTo0NC0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiOTllMzIyYy1iMmYxLTdjNGYtOTNkNS00YTg5YzFhM2Q2MDEiIHN0RXZ0OndoZW49IjIwMjQtMDktMjhUMjI6NTM6NTYtMDQ6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS4xMSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+kor61AAACohJREFUeJzt3f9LXNkZx/H3irUiQdwQZHDT4C5hsWkI3YZ0ERER/+5SFinp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"});}
    if(_wallets_.includes("solflare")){this.wallets.push({id:"solflare",label:"Solflare",inapp:async(agent)=>{return /Solflare/i.test(agent);},installed:async()=>{return !!window.solflare},provider:async()=>{return window.solflare;},link:"https://solflare.com/ul/v1/browse/"+encodeURIComponent("https://"+window.location.hostname+window.location.pathname+"#mcswap-connect-solflare")+"?ref="+encodeURIComponent("https://"+window.location.hostname),icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAADJCAYAAACJxhYFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGl2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuYTZhNjM5NiwgMjAyNC8wMy8xMi0wNzo0ODoyMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0wNy0wNFQxOToxNTo1Ni0wNDowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDktMjhUMjI6NTQ6MDgtMDQ6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDktMjhUMjI6NTQ6MDgtMDQ6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNkNjMyOTc3LTM2OTktMDc0MC04N2NjLTdmZjUzMTRiODUzNiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmNkNjI1N2QzLTJjZDQtODg0My1iOTQ5LWFhMmM1NGU5MWNmYSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjUzMzQxNThhLTE3MzctZGU0Yy1hM2E3LTFlYmQ5OTllM2M5ZiI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTMzNDE1OGEtMTczNy1kZTRjLWEzYTctMWViZDk5OWUzYzlmIiBzdEV2dDp3aGVuPSIyMDIzLTA3LTA0VDE5OjE1OjU2LTA0OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMCAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjc4YTFkN2I2LWVkMzQtOWQ0MS04YmYzLTgxZDZiNGY5ZGY0NyIgc3RFdnQ6d2hlbj0iMjAyMy0wNy0wNFQxOToyNjoyOC0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozZDYzMjk3Ny0zNjk5LTA3NDAtODdjYy03ZmY1MzE0Yjg1MzYiIHN0RXZ0OndoZW49IjIwMjQtMDktMjhUMjI6NTQ6MDgtMDQ6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS4xMSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+RrqONwAADINJREFUeJzt3X+o3XUdx/GnQy4i4zaWrDFU1lxREuMwRMayMcaSYRbLLDPp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"});}
    if(_wallets_.includes("backpack")){this.wallets.push({id:"backpack",label:"Backpack",inapp:async(agent)=>{return /Backpack/i.test(agent);},installed:async()=>{return !!window.backpack},provider:async()=>{return window.backpack;},link:"https://backpack.app/ul/browse/"+encodeURIComponent("https://"+window.location.hostname+window.location.pathname+"#mcswap-connect-backpack")+"?ref="+encodeURIComponent("https://"+window.location.hostname),icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAADJCAYAAACJxhYFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuYTZhNjM5NiwgMjAyNC8wMy8xMi0wNzo0ODoyMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0wNy0wNFQxOToxNTo1Ni0wNDowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjQtMDktMjhUMjI6NTM6NDYtMDQ6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDktMjhUMjI6NTM6NDYtMDQ6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmMzMWFjNzUwLTFkMmEtNDc0OS05ZTM2LTYwMzU5MjYwOWFmOSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjY2MmQ1NDI5LWNmMzItM2Q0Yi04YmVmLWEwYTc3ZmRhZTlhNyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjUzMzQxNThhLTE3MzctZGU0Yy1hM2E3LTFlYmQ5OTllM2M5ZiI+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPjc5ODlEMEUxQkQ2OEQ1MzcyNTQ3MzA5NkJBRDk4ODM5PC9yZGY6bGk+IDxyZGY6bGk+eG1wLmRpZDowY2QxNzYyMC00NmFhLTk0NGMtOGZkNC05MDM5Yzg5MDc4NTQ8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MzM0MTU4YS0xNzM3LWRlNGMtYTNhNy0xZWJkOTk5ZTNjOWYiIHN0RXZ0OndoZW49IjIwMjMtMDctMDRUMTk6MTU6NTYtMDQ6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMi4wIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NzhhMWQ3YjYtZWQzNC05ZDQxLThiZjMtODFkNmI0ZjlkZjQ3IiBzdEV2dDp3aGVuPSIyMDIzLTA3LTA0VDE5OjI2OjI4LTA0OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmMzMWFjNzUwLTFkMmEtNDc0OS05ZTM2LTYwMzU5MjYwOWFmOSIgc3RFdnQ6d2hlbj0iMjAyNC0wOS0yOFQyMjo1Mzo0Ni0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0i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"});}
    this.cancel="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAADJCAYAAACJxhYFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGl2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDIgNzkuYTZhNjM5NiwgMjAyNC8wMy8xMi0wNzo0ODoyMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0wNy0wNFQxOToxNTo1Ni0wNDowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjUtMDMtMTRUMTk6MzQ6MTgtMDQ6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjUtMDMtMTRUMTk6MzQ6MTgtMDQ6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM5Mjk5OTcxLTQ2YzYtYjY0MS1hMmNmLTMwNWM0N2I5Yjc2MSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmQ2MDIwZjVjLTgzYmMtMjM0Ny1hZDI3LTVlZDcyYWFiMzNiMCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjY2N2MyNDU3LTVmMGEtMzU0Ni04YjJhLTBjYjU2OTdhNmZjZiI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NjY3YzI0NTctNWYwYS0zNTQ2LThiMmEtMGNiNTY5N2E2ZmNmIiBzdEV2dDp3aGVuPSIyMDIzLTA3LTA0VDE5OjE1OjU2LTA0OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMCAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQyNjE3MGU3LTFlMDAtMTY0ZC1iMmE2LWIxYzc4NDI2ODMzNSIgc3RFdnQ6d2hlbj0iMjAyMy0wNy0wNFQxOToyNTo0NC0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozOTI5OTk3MS00NmM2LWI2NDEtYTJjZi0zMDVjNDdiOWI3NjEiIHN0RXZ0OndoZW49IjIwMjUtMDMtMTRUMTk6MzQ6MTgtMDQ6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNS4xMSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+88E3dQAAC3BJREFUeJzt3c+PXWUdx/F3DUv7g05bTVzIAhcujBtXJioaMekvO1QsSFQotUURMRrjX2Fcyw9LQcDSH0gLahQ0MdGFO6MbIvEHLgTTdno7hS4dF995nMtw73zPnXvOec73eT6vhJDQYe7TO/O+z/mec+bOlpWVFURkuvfkXoDI0CkSEYciEXEoEhGHIhFxKBIRhyIRcSgSEYciEXEoEhGHIhFxKBIRhyIRcSgSEYciEXEoEhGHIhFxKBIRhyIRcSgSEYciEXEoEhGHIhFxKBIRhyIRcSgSEYciEXEoEhGHIhFxKBIRhyIRcSgSEYciEXEoEhGHIhFxKBIRhyIRcSgSEYciEXEoEhGHIhFxKBIRx025F5DJB4D7gE8DO4EV4Arwa+AUcDnXwgZiD3AvcDuwAGwBloDfAk8Ab+RbWv+2rKys5F5D3z4H/AD4yJQ//yPwPeD3va1oWD4B/BD42JQ//xPwfeDlvhaUW22R3Ak8gu0eG/kPcD/wi85XNCx7gZPA+52Puwo8AJztfEUDUFMkR7BAdjT8+EvYIVktoezFDjX3NPz4ERbKmY7WMxi1DO5fZLZAAHZj3zT7OljP0MwaCNhz+Sj24lO0GiI5AjzGbIEku4Engf1tLmhg9mJ/x1kCSbZjz+1dra5oYEqP5Aj2ard9js+xCzujU2Io+7AdZPccn2Mb9hwXG0rJkbQRSLIbC6WkQ6992JC+mR1kvW3Y4WyRoZQaSZuBJCWFshf7u7yvxc+5nUJDKTGSu2k/kGQPdvweOZTNDOlNFRlKaZHchX2Ruggk2YV9k0WcUboMJNlOYTNKSZGkHWRbD4+VDr0ihdJHIEka5r/Uw2N1rpRI7gZ+RD+BJLuxwTdCKH0GkqRhPnwoJUSSAunyEGuaPQx/mM8RSLIV+9qEDiV6JHfT/QziGfKV+ZyBJNsIHkrkSO6hvxnEM8RQhhBIEvrQK2ok92CvTltzL2TMkIb5dCV9CIEkWwkaSsS7gBeBpxhWIONy3z28D4t1SIGMW8Z+oOuFzOtoLFoktwKvAB/MvRBHrlCGHkjyT+CzwN8yr6ORaIdbRxl+IJDn7uEDDO8Qa5pbsN0khGiRfDL3AmbQ593DB1Yfa567eft2W+4FNBUtEu/HboemjwuOB1YfY1eHj9GFm3MvoKlokYQaoFZ1ecFxPxZIpB0knGiRXMq9gE3q4jrKfuIdYo17M/cCmooWya9yL2AOu7FT1wdb+FxpSI8aCMBLuRfQVLRIngX+mnsRc1jADo/mCSUdYkWbQcb9BTidexFNRYvkX8BDxH6HxV1sPpSIZ7HWuwR8B3tvsxCiRQL2zoHHiB/Kj5ktlBKG9CvA14Df5F7ILKJdcR93EHtVXci9kDlcxi6Qesfn0Yd0sEDuBy7mXsisIu4kyYvYrR/Rd5RTbLyj7Cf+kB42EIgdCdgr8P3EDmWjYT6dxYo8pF8mcCAQPxKwHSV6KJOG+ahX0sddxubHsIFA7JlkvYOU8U31FeC/wNPEP8Q6BlzIvZB5lRQJlDHML2G330T/Oxwl+A6SlBYJlLGjRJZmkBdzL6QtJcwk65Uwo0SVZpBiAoEyIwGFkkMRQ/okpUYCa6Fcyb2QCqQr6cUFAmVHAhbKURRKl9KFwvBnsaYpPRJYC0WHXu1Lt9UUuYMkNUQCa6FE/aGtISpySJ+klkjAbmGJfvfwUFym4BlkvRKvk3gOYvdDRXtTiaEIfbPiZtS0kyTprNdS7oUEVF0gUGckYGdidNZrNlUM6ZPUGgnYF/sYCqWJaob0SW7KvYDM0rn9k2hGmSbdzVvdDpLUvJMkF9CMMs0SFc4g6ykSk2YUhbJmicp3kESRrLmI7vVK0iHWC5nXMQiK5J0uoGF+CTiOAvk/RfJuNYeyhF1J/1nuhQxJ7We3pklnvZ4g0K8ImNNVFMhE2kmmq+mCYzqLpUAmUCQbq+HQS0O6Q5H4Sg7lChrSXYqkmRJDSWexdIjlqPFW+Xnsx34RT/RbWJaw91Gu8l6sWWknmV0Jryor2LtESgOKpLlFbBeJ/M6KyQL2e+YP5V5IBIqkmUXsl+5EP8wat4D9nRSKQ5H4DgGPU1YgSQrl87kXMmSKZGOHsJ81KeEQa5r0+1EUyhSKZLpF7LaUEneQ9RawN8fQodcEimSyRewwpJb7tsD+rppRJlAk77ZIuTOIR8P8BIrkndKQXvIM4tEwv44iWVPDkN6UhvkxisQsUs+Q3tQC9pzckXshuSmSOof0pnZiz03VodQeySL1DulN3Yw9R9WGUnMkGtKb20nFodT6M+5pSNcO0lw69ILKfgalxp1EgWxeuuC4mHkdvaotkkXKu5u3bzdjLzLVHHrVFIlmkPakYX4x8zp6UUskh7AdRIG0p5rTwzUM7ppBulPFMF/6TnIYXUnvWhrmD+deSFdKjuQL2HGzrqR3r+gLjqVGchh4DAXSp2JDKTGSO1AguaQr84uZ19Gq0iI5TPzrIKPVf6LaSWHXUUqKpIQZ5CpwL/BVYv9qujTMFxFKKZGUMIOk9+a9iL396HEUyiCUcJ2khEBGwAng/Nh/e37135F3xzTMQ+DrKNF3ksPE/3mQEfYbps5P+LPnsR1l1ON62hZ+mI8cSRrSo77Kgs0gx5gcSHIei2jUx4I6EnqYjxpJCmRH5nXMI/0Sz+e9D8RCOY5FFVXYGSXi7yfZCzxD/B3kOBvvIJPcic1fO9peUI+WgC8Dv8y9kKaiRXIL8DJwa+Z1zGOzgSQlhPIacDvweu6FNBHtcOsosQMZMV8gAOeIP8x/CLseFEK0SG7LvYA5LOEP6U2dw+aZyDPKZ3IvoKlokUT9oal0iNVkSG/qPHZtJWooYb6W0S4mbsm9gE3oIpDk3Oq/o88ogxYtksu5FzCjEfPPIJ4UyuPA9g4fp22Xci+gqWiHW6/kXsAMRrQ3g3jSjDLq4bHa8vPcC2gqWiRPA3/PvYgGujzEmiad9Yowo7wK/DT3IpqKFsk/gG8z7FfMq9hAfc77wA5EOD18Ffgu8O/cC2kqWiQAL2HfhKPM65hkBDxAnkCSdNZrlHEN01wDvk6gq+0Q74r7uCPYWZ1tuRey6ho2F+QMZNydDGuYX8Z2uTO5FzKriDtJcgZ70pdzL4S1292HEggMa5hfxna3cIFA7EjAnvQT2Kt4LiMs1iEFkgxhmF/GDrGey7iGuUS7TjLJc9hFxkeBrT0/9lXyzyCetLZH6f/O6WXs+Tnd8+O2KvpOkpwGvgFc7/ExR9g3wNkeH3OzztH/MH8deJDggUDswX2Se4BHgPd2/DjXsMOYCIGM6+s2++vYi9YzHT9OL0rZSZJnsS/OWx0+xggbiKMFAv1cR3mLggKB8iIBuyrf1aHXiHwXCtvSZSjpEKuYQKDMSMBC+Sbwdoufc4QFEnEHWe8cNk+1eVbwOvac/6TFzzkIpUYC9sV6ELjRwucaUU4gSZunz9+m0ECg7EgAnsIOvebZUa5RXiBJCmWeC7JFBwLlRwIWykNsLpQRcYf0ps6w+Svzb2GBPNnmgoamhkgATjF7KCOGeyW9bWexGWU0w/9zA3iYwgOBeiIBC+Vhms0oI+KfxZrVGZqHcgP4Fvar9opXUyRgb7V5Anhzg495HXvropIPsaY5A9zHxu+H9Qb2HJ7sY0FDUNoV96Y+in0zfJy1W+1HwO+wHefVHIsakA9j74v1Kdauzi8Df8Cenz9nWVUmtUYi0lhth1siM1MkIg5FIuJQJCIORSLiUCQiDkUi4lAkIg5FIuJQJCIORSLiUCQiDkUi4lAkIg5FIuJQJCIORSLiUCQiDkUi4lAkIg5FIuJQJCIORSLiUCQiDkUi4lAkIg5FIuJQJCIORSLiUCQiDkUi4lAkIg5FIuJQJCIORSLiUCQiDkUi4lAkIg5FIuJQJCIORSLi+B/zxkZ37W4sagAAAABJRU5ErkJggg==";
  }
  async mobile(){return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);}
  async agent(){return navigator.userAgent || navigator.vendor || window.opera;}
  async connect(id){
    let active = false;
    for(let i=0;i<this.wallets.length;i++){
      const wallet = this.wallets[i];
      if(wallet.id==id){
        window.mcswap = await wallet.provider();
        await window.mcswap.connect().catch((err)=>{
          $("#mcswap_cover, #mcswap_chooser").fadeOut(300);
          $("#mcswap_message").html("");
        }).then(()=>{
          if(window.mcswap.isConnected===true){
            window.mcswap.on("accountChanged",async(publicKey)=>{
              this.disconnect(wallet.id);
            });
            this.connected();
          }
          else{
            this.disconnect();
          }
        });
        return;
      }
    }
  }
  async connected(){
      this.toast("Connected!", 2000);
      $(".mcswap_connect_button").hide();
      $(".mcswap_disconnect_button").fadeIn(300);
      if(this.emitter!=false){this.emitter.emit('connected');}
  }
  async disconnect(change=false){
    if(window.mcswap && window.mcswap!=false){
      await window.mcswap.removeAllListeners();
      await window.mcswap.disconnect();
      if(this._wallets_.includes(change)){
        this.connect(change);
      }
      else{
        window.mcswap = false;
        if(change!=false){
          this.toast("Disconnected!", 2000);
        }
        this.disconnected();
      }
    }
    else{
      this.disconnected(true);
    }
  }
  async disconnected(skip=false){
      $(".mcswap_disconnect_button").hide();
      $(".mcswap_connect_button").show();
      if(skip!=true && this.emitter!=false){this.emitter.emit('disconnected');}
  }
  async init(){
    // ********************************************
    const connector = '<div id="mcswap_connector"><div id="mcswap_cover"><div id="mcswap_message"></div></div><div id="mcswap_chooser"></div><input id="mcswap-account-change" value="" /></div>';
    $("body").append(connector);
    for(let i=0;i<this.wallets.length;i++){
      const wallet = this.wallets[i];
      const ele = '<button class="mcswap_choice mcswap_wallet_choice" id="mcswap_'+wallet.id+'"><img src="'+wallet.icon+'" /><span>'+wallet.label+'</span></button>';
      $("#mcswap_chooser").append(ele);
    }
    $("#mcswap_chooser").append('<button class="mcswap_choice" id="mcswap_cancel"><img src="'+this.cancel+'" /><span>Cancel</span></button>');
    // ********************************************
    const ismobile = await this.mobile();
    if(ismobile===true){
      let inapp = false;
      for(let i=0;i<this.wallets.length;i++){
        const wallet = this.wallets[i];
        console.log("wallet: ", wallet.id);
        const agent = await this.agent();
        console.log("agent: ", agent);
        const isinapp = await wallet.inapp(agent);
        console.log("isinapp: ", isinapp);
        if(isinapp===true){
          inapp=wallet.id;
          i=(this.wallets.length-1);
        }
        if(i==(this.wallets.length-1)){
          if(inapp!=false){
            $(".mcswap_wallet_choice").prop("disabled",true);
            $("#mcswap_"+wallet.id).attr("disabled",false);
          }
          else{
            $(".mcswap_wallet_choice ").addClass("deeplink");
            $(".mcswap_choice").prop("disabled",false);
          }
        }
      }
    }
    else{
      for(let i=0;i<this.wallets.length;i++){
        // checking for installed wallet failing with backpack
        // and sometimes with solflare too
        // console.log(window.backpack);
        // console.log(window.backpack?.isBackpack);
        // const is_installed = await wallet.installed();
        // console.log(wallet.id+": "+is_installed);
        const wallet = this.wallets[i];
        const is_installed = true;
        if(is_installed===true){
          $("#mcswap_"+wallet.id).attr("disabled",false);
        }
        else{
          $("#mcswap_"+wallet.id).attr("disabled",true);
        }
      }
    }
    // ********************************************
    $(window).on('resize', function() {
      let chooserHeight = $('#mcswap_chooser').outerHeight();
      const half = chooserHeight/2;
      $("#mcswap_chooser").css({"top":"calc(50% - "+half+"px)"});
    });
    $(".mcswap_connect_button").on("click",()=>{
      let chooserHeight = $('#mcswap_chooser').outerHeight();
      const half = chooserHeight/2;
      $("#mcswap_chooser").css({"top":"calc(50% - "+half+"px)"});
      $("#mcswap_cover, #mcswap_chooser").fadeIn(300);
    });
    // ********************************************
    $('button.mcswap_choice').on('click',async(e)=>{
        const button = $(e.currentTarget);
        const id = button.attr("id");
        if(id=="mcswap_cancel"){
          $("#mcswap_message").html("");
          $("#mcswap_cover, #mcswap_chooser").fadeOut(300);
        }
        else{
          const deeplink = $("#"+id).hasClass("deeplink");
          let link = false;
          const walletId = id.replace("mcswap_","");
          if(deeplink===true){
            for(let i=0;i<this.wallets.length;i++){
              const wallet = this.wallets[i];
              if(wallet.id==walletId){
                link=wallet.link;
              }
              if(i==(this.wallets.length-1)){
                let a = document.createElement('a');
                a.id = "mcswap_deep";
                a.href = link;
                document.body.appendChild(a);
                $("#mcswap_cover, #mcswap_chooser").hide();
                a.click(); a.remove();
              }
            }
          }
          else{
            await this.connect(walletId);
          }
        } 
    });
    // ********************************************
    $(".mcswap_disconnect_button").on("click",()=>{
      this.disconnect();
    });
    // ********************************************
    const hash = window.location.hash;
    if(hash.includes("#mcswap-connect-")){
      history.replaceState(null,null,'');
      history.pushState("","","");
      setTimeout(()=>{
        const name=hash.replace("#mcswap-connect-","");
        $("#mcswap_"+name).attr("disabled",false);
        $("#mcswap_"+name).click();
      },400);
    }
  }
  async toast(message,wait,error=false){
      let color = "#111";
      let background = "#fff";
      if(error===true){
          color = "#111";
          background = "#fff"
      }
      else{
          color = "#111";
          background = "#fff";
      }
      Toastify({
          text: message,
          duration: wait,
          newWindow: false,
          close: false,
          gravity: "bottom", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: false, // Prevents dismissing of toast on hover
          style: {
              "font-weight": "bold",
              "font-family": "Ubuntu",
              "border-radius": "10px",
              "color": color,
              "background": background,
          },
          onClick: function(){} // Callback after click
      }).showToast();
  }
  async provider(){
    if(window.mcswap){
      return window.mcswap;
    }
    else{
      return null;
    }
  }
};
export default mcswapConnector;