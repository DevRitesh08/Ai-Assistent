// Avatar Expression Manager
export class AvatarExpressions {
  private currentExpression: string = 'idle';

  setExpression(expression: string) {
    this.currentExpression = expression;
    console.log(`Expression changed to: ${expression}`);
  }

  getCurrentExpression(): string {
    return this.currentExpression;
  }
}

export default AvatarExpressions;